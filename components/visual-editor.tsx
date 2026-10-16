"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"

interface ElementPosition {
  id: string
  selector: string
  x: number
  y: number
  originalParent: string
  originalIndex: number
}

interface ClipboardItem {
  html: string
  styles: Record<string, string>
}

interface SelectionBox {
  startX: number
  startY: number
  endX: number
  endY: number
  isFinalized?: boolean
  selectedElements?: HTMLElement[]
}

interface ReplacedImage {
  id: string
  dataUrl: string
}

interface LinkEditState {
  element: HTMLElement
  currentUrl: string
  x: number
  y: number
}

interface ElementProperties {
  marginTop: string
  marginRight: string
  marginBottom: string
  marginLeft: string
  paddingTop: string
  paddingRight: string
  paddingBottom: string
  paddingLeft: string
  textAlign: string
  visibility: string
}

type EditMode = null | "text" | "image" | "spacing" | "styling"

const STORAGE_KEY = "webforge-visual-editor-positions"
const IMAGE_STORAGE_KEY = "webforge-visual-editor-images"
const LINK_STORAGE_KEY = "webforge-visual-editor-links"
const PROPERTIES_STORAGE_KEY = "webforge-visual-editor-properties"

async function saveToSupabase(dataType: string, elementId: string, data: unknown) {
  try {
    await fetch("/api/editor/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataType, elementId, data }),
    })
  } catch (error) {
    console.error("Failed to save to Supabase:", error)
  }
}

async function deleteFromSupabase(dataType: string, elementId: string) {
  try {
    await fetch("/api/editor/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataType, elementId }),
    })
  } catch (error) {
    console.error("Failed to delete from Supabase:", error)
  }
}

async function loadFromSupabase(
  dataType?: string,
): Promise<{ element_id: string; data: unknown; data_type: string }[]> {
  try {
    const url = dataType ? `/api/editor/load?dataType=${dataType}` : "/api/editor/load"
    const response = await fetch(url)
    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error("Failed to load from Supabase:", error)
    return []
  }
}

export function VisualEditor({ enabled }: { enabled: boolean }) {
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null)
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [clipboard, setClipboard] = useState<ClipboardItem | null>(null)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: "element" | "paste" } | null>(null)
  const [editingText, setEditingText] = useState<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [dragOverImage, setDragOverImage] = useState<HTMLElement | null>(null)
  const [editingLink, setEditingLink] = useState<LinkEditState | null>(null)
  const [linkInputValue, setLinkInputValue] = useState("")
  const linkInputRef = useRef<HTMLInputElement>(null)

  const [isDraggingBox, setIsDraggingBox] = useState(false)
  const [boxDragStart, setBoxDragStart] = useState({ x: 0, y: 0 })

  const [editMode, setEditMode] = useState<EditMode>(null)
  const [showActionMenu, setShowActionMenu] = useState(false)

  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false)
  const [elementProperties, setElementProperties] = useState<ElementProperties>({
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
    paddingTop: "0",
    paddingRight: "0",
    paddingBottom: "0",
    paddingLeft: "0",
    textAlign: "left",
    visibility: "visible",
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const loadAllData = async () => {
      try {
        // Load all data from Supabase
        const allData = await loadFromSupabase()

        // Group data by type
        const positions: ElementPosition[] = []
        const images: ReplacedImage[] = []
        const links: { id: string; url: string }[] = []
        const properties: { id: string; props: ElementProperties }[] = []
        const texts: { id: string; content: string }[] = []

        allData.forEach((item) => {
          const data = item.data as Record<string, unknown>
          switch (item.data_type) {
            case "positions":
              positions.push(data as unknown as ElementPosition)
              break
            case "images":
              images.push({ id: item.element_id, dataUrl: data.dataUrl as string })
              break
            case "links":
              links.push({ id: item.element_id, url: data.url as string })
              break
            case "properties":
              properties.push({ id: item.element_id, props: data as unknown as ElementProperties })
              break
            case "text":
              texts.push({ id: item.element_id, content: data.content as string })
              break
          }
        })

        // Apply positions
        positions.forEach((pos) => {
          const element = document.querySelector(`[data-editor-id="${pos.id}"]`) as HTMLElement
          if (element) {
            element.style.position = "relative"
            element.style.left = `${pos.x}px`
            element.style.top = `${pos.y}px`
            element.style.zIndex = "10"
          }
        })

        // Apply images
        images.forEach((img) => {
          const element = document.querySelector(`[data-editor-id="${img.id}"]`) as HTMLImageElement
          if (element && element.tagName === "IMG") {
            element.src = img.dataUrl
          }
        })

        // Apply links
        links.forEach((link) => {
          const element = document.querySelector(`[data-editor-id="${link.id}"]`) as HTMLAnchorElement
          if (element && element.tagName === "A") {
            element.href = link.url
          }
        })

        // Apply properties
        properties.forEach((item) => {
          const element = document.querySelector(`[data-editor-id="${item.id}"]`) as HTMLElement
          if (element) {
            element.style.marginTop = item.props.marginTop + "px"
            element.style.marginRight = item.props.marginRight + "px"
            element.style.marginBottom = item.props.marginBottom + "px"
            element.style.marginLeft = item.props.marginLeft + "px"
            element.style.paddingTop = item.props.paddingTop + "px"
            element.style.paddingRight = item.props.paddingRight + "px"
            element.style.paddingBottom = item.props.paddingBottom + "px"
            element.style.paddingLeft = item.props.paddingLeft + "px"
            element.style.textAlign = item.props.textAlign
            element.style.visibility = item.props.visibility
          }
        })

        // Apply text content
        texts.forEach((text) => {
          const element = document.querySelector(`[data-editor-id="${text.id}"]`) as HTMLElement
          if (element) {
            element.innerHTML = text.content
          }
        })

        // Also sync to localStorage as cache
        if (positions.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
        }
        if (images.length > 0) {
          localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images))
        }
        if (links.length > 0) {
          localStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(links))
        }
        if (properties.length > 0) {
          localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(properties))
        }
        texts.forEach((text) => {
          localStorage.setItem(`webforge-text-${text.id}`, text.content)
        })
      } catch (e) {
        console.error("Failed to load from Supabase, falling back to localStorage:", e)
        // Fallback to localStorage
        loadFromLocalStorage()
      }
    }

    const loadFromLocalStorage = () => {
      // Load positions
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const positions: ElementPosition[] = JSON.parse(saved)
          positions.forEach((pos) => {
            const element = document.querySelector(`[data-editor-id="${pos.id}"]`) as HTMLElement
            if (element) {
              element.style.position = "relative"
              element.style.left = `${pos.x}px`
              element.style.top = `${pos.y}px`
              element.style.zIndex = "10"
            }
          })
        }
      } catch (e) {
        console.error("Failed to load positions:", e)
      }

      // Load images
      try {
        const saved = localStorage.getItem(IMAGE_STORAGE_KEY)
        if (saved) {
          const images: ReplacedImage[] = JSON.parse(saved)
          images.forEach((img) => {
            const element = document.querySelector(`[data-editor-id="${img.id}"]`) as HTMLImageElement
            if (element && element.tagName === "IMG") {
              element.src = img.dataUrl
            }
          })
        }
      } catch (e) {
        console.error("Failed to load replaced images:", e)
      }

      // Load links
      try {
        const saved = localStorage.getItem(LINK_STORAGE_KEY)
        if (saved) {
          const links: { id: string; url: string }[] = JSON.parse(saved)
          links.forEach((link) => {
            const element = document.querySelector(`[data-editor-id="${link.id}"]`) as HTMLAnchorElement
            if (element && element.tagName === "A") {
              element.href = link.url
            }
          })
        }
      } catch (e) {
        console.error("Failed to load saved links:", e)
      }

      // Load properties
      try {
        const saved = localStorage.getItem(PROPERTIES_STORAGE_KEY)
        if (saved) {
          const allProperties: { id: string; props: ElementProperties }[] = JSON.parse(saved)
          allProperties.forEach((item) => {
            const element = document.querySelector(`[data-editor-id="${item.id}"]`) as HTMLElement
            if (element) {
              element.style.marginTop = item.props.marginTop + "px"
              element.style.marginRight = item.props.marginRight + "px"
              element.style.marginBottom = item.props.marginBottom + "px"
              element.style.marginLeft = item.props.marginLeft + "px"
              element.style.paddingTop = item.props.paddingTop + "px"
              element.style.paddingRight = item.props.paddingRight + "px"
              element.style.paddingBottom = item.props.paddingBottom + "px"
              element.style.paddingLeft = item.props.paddingLeft + "px"
              element.style.textAlign = item.props.textAlign
              element.style.visibility = item.props.visibility
            }
          })
        }
      } catch (e) {
        console.error("Failed to load properties:", e)
      }

      // Load text
      const elements = document.querySelectorAll("[data-editor-id]")
      elements.forEach((el) => {
        const id = el.getAttribute("data-editor-id")
        if (id) {
          const textKey = `webforge-text-${id}`
          const savedText = localStorage.getItem(textKey)
          if (savedText) {
            el.innerHTML = savedText
          }
        }
      })
    }

    setTimeout(loadAllData, 100)
  }, [enabled])

  // Assign unique IDs to editable elements
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const assignIds = () => {
      const editableSelectors = "p, h1, h2, h3, h4, h5, h6, span, img, button, a, div, li, section"
      const elements = document.querySelectorAll(editableSelectors)

      elements.forEach((el, index) => {
        if (
          !el.hasAttribute("data-editor-id") &&
          !el.closest("[data-admin-toolbar]") &&
          !el.closest("[data-visual-editor]")
        ) {
          el.setAttribute("data-editor-id", `element-${index}-${Date.now()}`)
        }
      })
    }

    assignIds()

    const observer = new MutationObserver(assignIds)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [enabled])

  useEffect(() => {
    if (selectedElement) {
      const computed = window.getComputedStyle(selectedElement)
      setElementProperties({
        marginTop: Number.parseInt(computed.marginTop) || 0 + "",
        marginRight: Number.parseInt(computed.marginRight) || 0 + "",
        marginBottom: Number.parseInt(computed.marginBottom) || 0 + "",
        marginLeft: Number.parseInt(computed.marginLeft) || 0 + "",
        paddingTop: Number.parseInt(computed.paddingTop) || 0 + "",
        paddingRight: Number.parseInt(computed.paddingRight) || 0 + "",
        paddingBottom: Number.parseInt(computed.paddingBottom) || 0 + "",
        paddingLeft: Number.parseInt(computed.paddingLeft) || 0 + "",
        textAlign: computed.textAlign || "left",
        visibility: computed.visibility || "visible",
      })
      setShowActionMenu(true)
    } else {
      setShowActionMenu(false)
      setEditMode(null)
      setShowPropertiesPanel(false)
    }
  }, [selectedElement])

  const savePosition = useCallback((element: HTMLElement, x: number, y: number) => {
    const id = element.getAttribute("data-editor-id")
    if (!id) return

    const newPosition: ElementPosition = {
      id,
      selector: element.tagName.toLowerCase(),
      x,
      y,
      originalParent: element.parentElement?.getAttribute("data-editor-id") || "",
      originalIndex: Array.from(element.parentElement?.children || []).indexOf(element),
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const positions: ElementPosition[] = saved ? JSON.parse(saved) : []

      const existingIndex = positions.findIndex((p) => p.id === id)

      if (existingIndex >= 0) {
        positions[existingIndex] = newPosition
      } else {
        positions.push(newPosition)
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
    } catch (e) {
      console.error("Failed to save position to localStorage:", e)
    }

    // Save to Supabase
    saveToSupabase("positions", id, newPosition)
  }, [])

  const saveReplacedImage = useCallback((element: HTMLImageElement, dataUrl: string) => {
    const id = element.getAttribute("data-editor-id")
    if (!id) return

    try {
      const saved = localStorage.getItem(IMAGE_STORAGE_KEY)
      const images: ReplacedImage[] = saved ? JSON.Parse(saved) : []

      const existingIndex = images.findIndex((img) => img.id === id)
      const newImage: ReplacedImage = { id, dataUrl }

      if (existingIndex >= 0) {
        images[existingIndex] = newImage
      } else {
        images.push(newImage)
      }

      localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images))
    } catch (e) {
      console.error("Failed to save replaced image to localStorage:", e)
    }

    // Save to Supabase
    saveToSupabase("images", id, { dataUrl })
  }, [])

  const saveLinkUrl = useCallback((element: HTMLElement, url: string) => {
    const id = element.getAttribute("data-editor-id")
    if (!id) return

    try {
      const saved = localStorage.getItem(LINK_STORAGE_KEY)
      const links: { id: string; url: string }[] = saved ? JSON.parse(saved) : []

      const existingIndex = links.findIndex((l) => l.id === id)
      const newLink = { id, url }

      if (existingIndex >= 0) {
        links[existingIndex] = newLink
      } else {
        links.push(newLink)
      }

      localStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(links))
    } catch (e) {
      console.error("Failed to save link URL to localStorage:", e)
    }

    // Save to Supabase
    saveToSupabase("links", id, { url })
  }, [])

  const saveElementProperties = useCallback((element: HTMLElement, props: ElementProperties) => {
    const id = element.getAttribute("data-editor-id")
    if (!id) return

    try {
      const saved = localStorage.getItem(PROPERTIES_STORAGE_KEY)
      const allProperties: { id: string; props: ElementProperties }[] = saved ? JSON.parse(saved) : []

      const existingIndex = allProperties.findIndex((p) => p.id === id)
      const newEntry = { id, props }

      if (existingIndex >= 0) {
        allProperties[existingIndex] = newEntry
      } else {
        allProperties.push(newEntry)
      }

      localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(allProperties))
    } catch (e) {
      console.error("Failed to save element properties to localStorage:", e)
    }

    // Save to Supabase
    saveToSupabase("properties", id, props)
  }, [])

  const updateProperty = useCallback(
    (property: keyof ElementProperties, value: string) => {
      if (!selectedElement) return

      const newProps = { ...elementProperties, [property]: value }
      setElementProperties(newProps)

      // Apply to element
      if (property.startsWith("margin") || property.startsWith("padding")) {
        selectedElement.style[property as any] = value + "px"
      } else {
        selectedElement.style[property as any] = value
      }

      saveElementProperties(selectedElement, newProps)
    },
    [selectedElement, elementProperties, saveElementProperties],
  )

  const handleSaveLink = useCallback(() => {
    if (!editingLink) return

    const element = editingLink.element
    let url = linkInputValue.trim()

    // Add https:// if no protocol specified
    if (
      url &&
      !url.startsWith("http://") &&
      !url.startsWith("https://") &&
      !url.startsWith("/") &&
      !url.startsWith("#") &&
      !url.startsWith("mailto:") &&
      !url.startsWith("tel:")
    ) {
      url = "https://" + url
    }

    if (element.tagName === "A") {
      ;(element as HTMLAnchorElement).href = url
    } else if (element.tagName === "BUTTON") {
      element.setAttribute("data-link-url", url)
    }

    saveLinkUrl(element, url)
    setEditingLink(null)
    setLinkInputValue("")
  }, [editingLink, linkInputValue, saveLinkUrl])

  useEffect(() => {
    if (editingLink && linkInputRef.current) {
      linkInputRef.current.focus()
      linkInputRef.current.select()
    }
  }, [editingLink])

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      if (!enabled) return

      const target = e.target as HTMLElement

      if (
        target.tagName === "IMG" &&
        !target.closest("[data-admin-toolbar]") &&
        !target.closest("[data-visual-editor]")
      ) {
        e.preventDefault()
        e.dataTransfer!.dropEffect = "copy"
        setDragOverImage(target)
        target.style.outline = "3px solid #22c55e"
        target.style.outlineOffset = "2px"
      }
    },
    [enabled],
  )

  const handleDragLeave = useCallback(
    (e: DragEvent) => {
      if (!enabled) return

      const target = e.target as HTMLElement
      if (target.tagName === "IMG") {
        target.style.outline = ""
        target.style.outlineOffset = ""
        setDragOverImage(null)
      }
    },
    [enabled],
  )

  const handleDrop = useCallback(
    (e: DragEvent) => {
      if (!enabled) return

      const target = e.target as HTMLElement

      if (
        target.tagName === "IMG" &&
        !target.closest("[data-admin-toolbar]") &&
        !target.closest("[data-visual-editor]")
      ) {
        e.preventDefault()
        e.stopPropagation()

        target.style.outline = ""
        target.style.outlineOffset = ""
        setDragOverImage(null)

        const files = e.dataTransfer?.files
        if (files && files.length > 0) {
          const file = files[0]

          if (file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = (event) => {
              const dataUrl = event.target?.result as string
              if (dataUrl) {
                const imgElement = target as HTMLImageElement
                imgElement.src = dataUrl
                saveReplacedImage(imgElement, dataUrl)
              }
            }
            reader.readAsDataURL(file)
          }
        }
      }
    },
    [enabled, saveReplacedImage],
  )

  const isLeafElement = useCallback((element: HTMLElement): boolean => {
    const containerTags = ["SECTION", "MAIN", "HEADER", "FOOTER", "NAV", "ASIDE", "ARTICLE"]

    // If it's a known container tag with multiple children, skip it
    if (containerTags.includes(element.tagName)) {
      const childElements = Array.from(element.children).filter((child) => !["SCRIPT", "STYLE"].includes(child.tagName))
      if (childElements.length > 1) return false
    }

    // If it's a div with multiple block-level children, skip it
    if (element.tagName === "DIV") {
      const childElements = Array.from(element.children).filter((child) => !["SCRIPT", "STYLE"].includes(child.tagName))
      const blockChildren = childElements.filter((child) => {
        const display = window.getComputedStyle(child).display
        return display === "block" || display === "flex" || display === "grid"
      })
      if (blockChildren.length > 2) return false
    }

    return true
  }, [])

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return

      const target = e.target as HTMLElement

      if (
        target.closest("[data-admin-toolbar]") ||
        target.closest("[data-visual-editor]") ||
        target.closest("[data-context-menu]") ||
        target.closest('[role="dialog"]') ||
        target.closest("[data-link-editor]") ||
        target.closest("[data-properties-panel]") ||
        target.closest("[data-action-menu]") ||
        target.closest("[data-selection-box]")
      ) {
        if (target.closest("[data-selection-box]") && selectionBox?.isFinalized) {
          setIsDraggingBox(true)
          setBoxDragStart({ x: e.clientX, y: e.clientY })
          e.preventDefault()
        }
        return
      }

      setContextMenu(null)

      if (selectionBox?.isFinalized) {
        // Clear previous selection outlines
        selectionBox.selectedElements?.forEach((el) => {
          el.style.outline = ""
        })
        setSelectionBox(null)
      }

      if (selectedElement && selectedElement.contains(target)) {
        setIsDragging(true)
        const rect = selectedElement.getBoundingClientRect()
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
        e.preventDefault()
        return
      }

      setIsSelecting(true)
      setSelectionBox({
        startX: e.clientX + window.scrollX,
        startY: e.clientY + window.scrollY,
        endX: e.clientX + window.scrollX,
        endY: e.clientY + window.scrollY,
        isFinalized: false,
        selectedElements: [],
      })

      if (selectedElement) {
        selectedElement.style.outline = ""
        setSelectedElement(null)
      }
    },
    [enabled, selectedElement, selectionBox],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return

      if (isDraggingBox && selectionBox?.isFinalized && selectionBox.selectedElements) {
        const deltaX = e.clientX - boxDragStart.x
        const deltaY = e.clientY - boxDragStart.y

        // Move each selected element
        selectionBox.selectedElements.forEach((el) => {
          const currentLeft = Number.parseFloat(el.style.left) || 0
          const currentTop = Number.parseFloat(el.style.top) || 0
          el.style.position = "relative"
          el.style.left = `${currentLeft + deltaX}px`
          el.style.top = `${currentTop + deltaY}px`
        })

        // Update box position
        setSelectionBox({
          ...selectionBox,
          startX: selectionBox.startX + deltaX,
          startY: selectionBox.startY + deltaY,
          endX: selectionBox.endX + deltaX,
          endY: selectionBox.endY + deltaY,
        })

        setBoxDragStart({ x: e.clientX, y: e.clientY })
        return
      }

      if (isSelecting && selectionBox) {
        setSelectionBox({
          ...selectionBox,
          endX: e.clientX + window.scrollX,
          endY: e.clientY + window.scrollY,
        })
      }

      if (isDragging && selectedElement) {
        const rect = selectedElement.getBoundingClientRect()
        const currentLeft = Number.parseFloat(selectedElement.style.left) || 0
        const currentTop = Number.parseFloat(selectedElement.style.top) || 0

        const newX = currentLeft + (e.clientX - rect.left - dragOffset.x)
        const newY = currentTop + (e.clientY - rect.top - dragOffset.y)

        selectedElement.style.position = "relative"
        selectedElement.style.left = `${newX}px`
        selectedElement.style.top = `${newY}px`
        selectedElement.style.zIndex = "10"
      }
    },
    [enabled, isSelecting, selectionBox, isDragging, selectedElement, dragOffset, isDraggingBox, boxDragStart],
  )

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return

      if (isDraggingBox && selectionBox?.selectedElements) {
        // Save positions for all moved elements
        selectionBox.selectedElements.forEach((el) => {
          const x = Number.parseFloat(el.style.left) || 0
          const y = Number.parseFloat(el.style.top) || 0
          savePosition(el, x, y)
        })
        setIsDraggingBox(false)
        return
      }

      if (isDragging && selectedElement) {
        const x = Number.parseFloat(selectedElement.style.left) || 0
        const y = Number.parseFloat(selectedElement.style.top) || 0
        savePosition(selectedElement, x, y)
        setIsDragging(false)
        return
      }

      if (isSelecting && selectionBox) {
        setIsSelecting(false)

        const left = Math.min(selectionBox.startX, selectionBox.endX)
        const right = Math.max(selectionBox.startX, selectionBox.endX)
        const top = Math.min(selectionBox.startY, selectionBox.endY)
        const bottom = Math.max(selectionBox.startY, selectionBox.endY)

        if (right - left > 10 && bottom - top > 10) {
          const elements = document.querySelectorAll("[data-editor-id]")
          const selectedElements: HTMLElement[] = []

          elements.forEach((el) => {
            if (el.closest("[data-admin-toolbar]") || el.closest("[data-visual-editor]")) return

            const htmlEl = el as HTMLElement

            if (!isLeafElement(htmlEl)) return

            const rect = el.getBoundingClientRect()
            const elLeft = rect.left + window.scrollX
            const elRight = rect.right + window.scrollX
            const elTop = rect.top + window.scrollY
            const elBottom = rect.bottom + window.scrollY

            const isFullyInside = elLeft >= left && elRight <= right && elTop >= top && elBottom <= bottom

            if (isFullyInside) {
              selectedElements.push(htmlEl)
              htmlEl.style.outline = "2px dashed #06a0c7"
            }
          })

          if (selectedElements.length > 0) {
            setSelectionBox({
              startX: left,
              startY: top,
              endX: right,
              endY: bottom,
              isFinalized: true,
              selectedElements,
            })
            // Clear single element selection
            if (selectedElement) {
              selectedElement.style.outline = ""
              setSelectedElement(null)
            }
          } else {
            setSelectionBox(null)
          }
        } else {
          setSelectionBox(null)
        }
      }
    },
    [enabled, isSelecting, selectionBox, isDragging, selectedElement, isDraggingBox, savePosition, isLeafElement],
  )

  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return

      const target = e.target as HTMLElement

      if (
        target.closest("[data-admin-toolbar]") ||
        target.closest("[data-visual-editor]") ||
        target.closest("[data-link-editor]") ||
        target.closest("[data-properties-panel]") ||
        target.closest("[data-action-menu]")
      ) {
        return
      }

      e.preventDefault()

      // Show context menu for selected elements in a finalized box
      if (selectionBox?.isFinalized && selectionBox.selectedElements?.some((el) => el.contains(target))) {
        setContextMenu({ x: e.clientX, y: e.clientY, type: "element" })
      } else if (selectedElement && selectedElement.contains(target)) {
        setContextMenu({ x: e.clientX, y: e.clientY, type: "element" })
      } else if (clipboard) {
        setContextMenu({ x: e.clientX, y: e.clientY, type: "paste" })
      }
    },
    [enabled, selectedElement, clipboard, selectionBox],
  )

  const handleCopy = useCallback(() => {
    if (!selectedElement && !selectionBox?.isFinalized) return

    let elementsToCopy: HTMLElement[] = []
    if (selectionBox?.isFinalized && selectionBox.selectedElements) {
      elementsToCopy = selectionBox.selectedElements
    } else if (selectedElement) {
      elementsToCopy = [selectedElement]
    } else {
      return
    }

    // For now, just copy the first element if multiple are selected
    // In the future, could implement copying a group or individual elements
    const element = elementsToCopy[0]

    const styles: Record<string, string> = {}
    const computedStyles = window.getComputedStyle(element)
    const importantStyles = [
      "fontSize",
      "fontFamily",
      "fontWeight",
      "color",
      "backgroundColor",
      "padding",
      "margin",
      "borderRadius",
      "border",
      "textAlign",
    ]

    importantStyles.forEach((style) => {
      styles[style] = computedStyles.getPropertyValue(style.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`))
    })

    setClipboard({
      html: element.outerHTML,
      styles,
    })
    setContextMenu(null)
  }, [selectedElement, selectionBox])

  const handlePaste = useCallback(
    (x: number, y: number) => {
      if (!clipboard) return

      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = clipboard.html
      const newElement = tempDiv.firstElementChild as HTMLElement

      if (newElement) {
        newElement.setAttribute("data-editor-id", `element-pasted-${Date.now()}`)

        newElement.style.position = "fixed"
        newElement.style.left = `${x}px`
        newElement.style.top = `${y}px`
        newElement.style.zIndex = "100"

        const container = document.querySelector("main") || document.body
        container.appendChild(newElement)

        if (selectedElement) {
          selectedElement.style.outline = ""
        }
        // Clear selection box on paste
        if (selectionBox?.isFinalized) {
          selectionBox.selectedElements?.forEach((el) => {
            el.style.outline = ""
          })
          setSelectionBox(null)
        }
        setSelectedElement(newElement)
        newElement.style.outline = "2px dashed #06a0c7"
      }

      setContextMenu(null)
    },
    [clipboard, selectedElement, selectionBox],
  )

  const handleDoubleClick = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return

      const target = e.target as HTMLElement

      if (
        target.closest("[data-admin-toolbar]") ||
        target.closest("[data-visual-editor]") ||
        target.closest("[data-link-editor]") ||
        target.closest("[data-properties-panel]") ||
        target.closest("[data-action-menu]")
      ) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      // Handle double-click for text editing
      const textTags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "LI"]
      if (textTags.includes(target.tagName)) {
        target.contentEditable = "true"
        target.focus()
        setEditingText(target)

        const range = document.createRange()
        range.selectNodeContents(target)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    },
    [enabled],
  )

  const handleBlur = useCallback(
    (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target === editingText) {
        target.contentEditable = "false"
        setEditingText(null)

        const id = target.getAttribute("data-editor-id")
        if (id) {
          const content = target.innerHTML
          try {
            const textKey = `webforge-text-${id}`
            localStorage.setItem(textKey, content)
          } catch (e) {
            console.error("Failed to save text to localStorage:", e)
          }
          saveToSupabase("text", id, { content })
        }
      }
    },
    [editingText],
  )

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return

      const target = e.target as HTMLElement

      if (
        target.closest("[data-admin-toolbar]") ||
        target.closest("[data-visual-editor]") ||
        target.closest("[data-context-menu]") ||
        target.closest("[data-link-editor]") ||
        target.closest("[data-properties-panel]") ||
        target.closest("[data-action-menu]")
      ) {
        return
      }

      // Prevent default click behavior for elements within a finalized selection box
      if (selectionBox?.isFinalized && selectionBox.selectedElements?.some((el) => el.contains(target))) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      if (target.closest("a") || target.closest("button") || target.closest('[role="button"]')) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [enabled, selectionBox],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return

      if (editingLink) {
        if (e.key === "Enter") {
          e.preventDefault()
          handleSaveLink()
        } else if (e.key === "Escape") {
          setEditingLink(null)
          setLinkInputValue("")
        }
        return
      }

      if (e.key === "Escape") {
        if (editMode) {
          setEditMode(null)
          setShowPropertiesPanel(false)
        } else if (selectionBox?.isFinalized) {
          selectionBox.selectedElements?.forEach((el) => {
            el.style.outline = ""
          })
          setSelectionBox(null)
        } else if (selectedElement) {
          selectedElement.style.outline = ""
          setSelectedElement(null)
        }
        setContextMenu(null)
        return
      }

      if (e.key === "Delete" && selectedElement && !editingText) {
        e.preventDefault()
        selectedElement.style.outline = ""

        const id = selectedElement.getAttribute("data-editor-id")
        selectedElement.remove()
        setSelectedElement(null)

        if (id) {
          // Remove from localStorage
          const saved = localStorage.getItem(STORAGE_KEY)
          if (saved) {
            const positions: ElementPosition[] = JSON.parse(saved)
            const filtered = positions.filter((p) => p.id !== id)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
          }
          // Remove from Supabase
          deleteFromSupabase("positions", id)
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "c" && selectedElement && !editingText) {
        handleCopy()
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "v" && clipboard && !editingText) {
        // Adjust paste position for context menu
        const pasteX = contextMenu ? contextMenu.x : window.innerWidth / 2
        const pasteY = contextMenu ? contextMenu.y : window.innerHeight / 2
        handlePaste(pasteX, pasteY)
      }
    },
    [
      enabled,
      selectedElement,
      editingText,
      clipboard,
      editingLink,
      handleCopy,
      handlePaste,
      handleSaveLink,
      contextMenu,
      selectionBox,
      editMode,
    ],
  )

  // Add event listeners
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("dblclick", handleDoubleClick)
    document.addEventListener("click", handleClick, true)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("focusout", handleBlur as EventListener)
    document.addEventListener("dragover", handleDragOver)
    document.addEventListener("dragleave", handleDragLeave)
    document.addEventListener("drop", handleDrop)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("dblclick", handleDoubleClick)
      document.removeEventListener("click", handleClick, true)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("focusout", handleBlur as EventListener)
      document.removeEventListener("dragover", handleDragOver)
      document.removeEventListener("dragleave", handleDragLeave)
      document.removeEventListener("drop", handleDrop)
    }
  }, [
    enabled,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleContextMenu,
    handleDoubleClick,
    handleClick,
    handleKeyDown,
    handleBlur,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  ])

  useEffect(() => {
    if (!enabled) return

    const handleSaveAll = () => {
      // Save all current element states to Supabase
      const elements = document.querySelectorAll("[data-editor-id]")

      elements.forEach((el) => {
        const htmlEl = el as HTMLElement
        const id = htmlEl.getAttribute("data-editor-id")
        if (!id) return

        // Save position if element has been moved
        const left = htmlEl.style.left
        const top = htmlEl.style.top
        if (left && top) {
          const x = Number.parseFloat(left) || 0
          const y = Number.parseFloat(top) || 0
          savePosition(htmlEl, x, y)
        }

        // Save text content if changed
        const textKey = `webforge-text-${id}`
        const savedText = localStorage.getItem(textKey)
        if (savedText) {
          saveToSupabase("text", id, { content: savedText })
        }

        // Save properties if they exist
        try {
          const saved = localStorage.getItem(PROPERTIES_STORAGE_KEY)
          if (saved) {
            const allProperties: { id: string; props: ElementProperties }[] = JSON.parse(saved)
            const props = allProperties.find((p) => p.id === id)
            if (props) {
              saveToSupabase("properties", id, props.props)
            }
          }
        } catch (e) {
          console.error("Failed to save properties:", e)
        }
      })
    }

    window.addEventListener("admin-save-all", handleSaveAll)

    return () => {
      window.removeEventListener("admin-save-all", handleSaveAll)
    }
  }, [enabled, savePosition])

  const handleImageReplace = useCallback(() => {
    if (!selectedElement || selectedElement.tagName !== "IMG") return

    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string
          if (dataUrl) {
            ;(selectedElement as HTMLImageElement).src = dataUrl
            saveReplacedImage(selectedElement as HTMLImageElement, dataUrl)
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }, [selectedElement, saveReplacedImage])

  const handleEditLink = useCallback(() => {
    if (!selectedElement) return

    const linkElement = selectedElement.closest("a") as HTMLAnchorElement | null
    const buttonElement = selectedElement.closest("button") as HTMLButtonElement | null

    if (linkElement) {
      setEditingLink({
        element: linkElement,
        currentUrl: linkElement.href || "",
        x: 0,
        y: 0,
      })
      setLinkInputValue(linkElement.href || "")
    } else if (buttonElement) {
      setEditingLink({
        element: buttonElement,
        currentUrl: buttonElement.getAttribute("data-link-url") || "",
        x: 0,
        y: 0,
      })
      setLinkInputValue(buttonElement.getAttribute("data-link-url") || "")
    }
  }, [selectedElement])

  if (!mounted || !enabled) return null

  const POPUP_STYLE = {
    position: "fixed" as const,
    right: 20,
    bottom: 100,
    zIndex: 10001,
  }

  return createPortal(
    <div data-visual-editor>
      {/* Selection Box */}
      {selectionBox && (isSelecting || selectionBox.isFinalized) && (
        <div
          data-selection-box
          style={{
            position: "absolute",
            left: Math.min(selectionBox.startX, selectionBox.endX),
            top: Math.min(selectionBox.startY, selectionBox.endY),
            width: Math.abs(selectionBox.endX - selectionBox.startX),
            height: Math.abs(selectionBox.endY - selectionBox.startY),
            border: `2px dashed #06a0c7`,
            backgroundColor: selectionBox.isFinalized ? "rgba(6, 160, 199, 0.15)" : "rgba(6, 160, 199, 0.1)",
            cursor: selectionBox.isFinalized ? "move" : "default",
            pointerEvents: selectionBox.isFinalized ? "auto" : "none",
            zIndex: 9999,
          }}
        >
          {selectionBox.isFinalized && (
            <div className="absolute -top-6 left-0 bg-[#06a0c7] text-white text-xs px-2 py-1 rounded">
              {selectionBox.selectedElements?.length || 0} element
              {(selectionBox.selectedElements?.length || 0) !== 1 ? "s" : ""} selected — drag to move
            </div>
          )}
        </div>
      )}

      {/* Context Menu - Fixed bottom right */}
      {contextMenu && (
        <div
          data-context-menu
          style={POPUP_STYLE}
          className="bg-background border border-border rounded-lg shadow-xl py-1 min-w-[120px]"
        >
          {contextMenu.type === "element" ? (
            <button
              onClick={handleCopy}
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors"
            >
              Copy
            </button>
          ) : (
            <button
              onClick={() => handlePaste(contextMenu.x, contextMenu.y)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors"
            >
              Paste
            </button>
          )}
        </div>
      )}

      {/* Link Editor - Fixed bottom right */}
      {editingLink && (
        <div
          data-link-editor
          style={POPUP_STYLE}
          className="bg-background border border-border rounded-lg shadow-xl p-3 min-w-[300px]"
        >
          <div className="text-xs text-muted-foreground mb-2">Edit Link URL</div>
          <div className="flex gap-2">
            <input
              ref={linkInputRef}
              type="text"
              value={linkInputValue}
              onChange={(e) => setLinkInputValue(e.target.value)}
              placeholder="https://example.com or /page"
              className="flex-1 px-3 py-1.5 text-sm bg-muted border border-border rounded focus:outline-none focus:ring-2 focus:ring-[#06a0c7]"
            />
            <button
              onClick={handleSaveLink}
              className="px-3 py-1.5 text-sm bg-[#06a0c7] text-white rounded hover:bg-[#058aa8] transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingLink(null)
                setLinkInputValue("")
              }}
              className="px-3 py-1.5 text-sm bg-muted text-foreground rounded hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showActionMenu && selectedElement && !editMode && !editingLink && (
        <div
          data-action-menu
          style={POPUP_STYLE}
          className="bg-background border border-border rounded-lg shadow-xl p-3 min-w-[200px]"
        >
          <div className="text-xs text-muted-foreground mb-2">
            Edit: &lt;{selectedElement.tagName.toLowerCase()}&gt;
          </div>
          <div className="flex flex-col gap-2">
            {/* Text Edit - only for text elements */}
            {["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "LI"].includes(selectedElement.tagName) && (
              <button
                onClick={() => {
                  selectedElement.contentEditable = "true"
                  selectedElement.focus()
                  setEditingText(selectedElement)
                  const range = document.createRange()
                  range.selectNodeContents(selectedElement)
                  const sel = window.getSelection()
                  sel?.removeAllRanges()
                  sel?.addRange(range)
                }}
                className="w-full px-3 py-2 text-sm text-left bg-muted hover:bg-[#06a0c7] hover:text-white rounded transition-colors"
              >
                Edit Text
              </button>
            )}

            {/* Image Replace - only for images */}
            {selectedElement.tagName === "IMG" && (
              <button
                onClick={handleImageReplace}
                className="w-full px-3 py-2 text-sm text-left bg-muted hover:bg-[#06a0c7] hover:text-white rounded transition-colors"
              >
                Replace Image
              </button>
            )}

            {/* Edit Link - only for links/buttons */}
            {(selectedElement.tagName === "A" ||
              selectedElement.tagName === "BUTTON" ||
              selectedElement.closest("a") ||
              selectedElement.closest("button")) && (
              <button
                onClick={handleEditLink}
                className="w-full px-3 py-2 text-sm text-left bg-muted hover:bg-[#06a0c7] hover:text-white rounded transition-colors"
              >
                Edit Link
              </button>
            )}

            {/* Spacing (Margins/Padding) */}
            <button
              onClick={() => {
                setEditMode("spacing")
                setShowPropertiesPanel(true)
              }}
              className="w-full px-3 py-2 text-sm text-left bg-muted hover:bg-[#06a0c7] hover:text-white rounded transition-colors"
            >
              Spacing (Margins/Padding)
            </button>

            {/* Visual Styling (Alignment/Visibility) */}
            <button
              onClick={() => {
                setEditMode("styling")
                setShowPropertiesPanel(true)
              }}
              className="w-full px-3 py-2 text-sm text-left bg-muted hover:bg-[#06a0c7] hover:text-white rounded transition-colors"
            >
              Visual Styling
            </button>
          </div>
        </div>
      )}

      {showPropertiesPanel && selectedElement && editMode === "spacing" && (
        <div
          data-properties-panel
          style={POPUP_STYLE}
          className="bg-background border border-border rounded-lg shadow-xl p-4 w-[260px]"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-semibold text-foreground">Spacing</div>
            <button
              onClick={() => {
                setEditMode(null)
                setShowPropertiesPanel(false)
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Back
            </button>
          </div>

          {/* Margin */}
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-2">Margin (px)</div>
            <div className="grid grid-cols-4 gap-1">
              {(["marginTop", "marginRight", "marginBottom", "marginLeft"] as const).map((prop) => (
                <div key={prop} className="text-center">
                  <label className="text-[10px] text-muted-foreground">{prop.replace("margin", "")}</label>
                  <input
                    type="number"
                    value={elementProperties[prop]}
                    onChange={(e) => updateProperty(prop, e.target.value)}
                    className="w-full px-1 py-1 text-xs bg-muted border border-border rounded text-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Padding */}
          <div>
            <div className="text-xs text-muted-foreground mb-2">Padding (px)</div>
            <div className="grid grid-cols-4 gap-1">
              {(["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] as const).map((prop) => (
                <div key={prop} className="text-center">
                  <label className="text-[10px] text-muted-foreground">{prop.replace("padding", "")}</label>
                  <input
                    type="number"
                    value={elementProperties[prop]}
                    onChange={(e) => updateProperty(prop, e.target.value)}
                    className="w-full px-1 py-1 text-xs bg-muted border border-border rounded text-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showPropertiesPanel && selectedElement && editMode === "styling" && (
        <div
          data-properties-panel
          style={POPUP_STYLE}
          className="bg-background border border-border rounded-lg shadow-xl p-4 w-[260px]"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-semibold text-foreground">Visual Styling</div>
            <button
              onClick={() => {
                setEditMode(null)
                setShowPropertiesPanel(false)
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Back
            </button>
          </div>

          {/* Alignment */}
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-2">Text Alignment</div>
            <div className="flex gap-1">
              {["left", "center", "right", "justify"].map((align) => (
                <button
                  key={align}
                  onClick={() => updateProperty("textAlign", align)}
                  className={`flex-1 px-2 py-1.5 text-xs rounded transition-colors ${
                    elementProperties.textAlign === align ? "bg-[#06a0c7] text-white" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {align.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div>
            <div className="text-xs text-muted-foreground mb-2">Visibility</div>
            <div className="flex gap-1">
              <button
                onClick={() => updateProperty("visibility", "visible")}
                className={`flex-1 px-2 py-1.5 text-xs rounded transition-colors ${
                  elementProperties.visibility === "visible" ? "bg-[#06a0c7] text-white" : "bg-muted hover:bg-muted/80"
                }`}
              >
                Visible
              </button>
              <button
                onClick={() => updateProperty("visibility", "hidden")}
                className={`flex-1 px-2 py-1.5 text-xs rounded transition-colors ${
                  elementProperties.visibility === "hidden" ? "bg-[#06a0c7] text-white" : "bg-muted hover:bg-muted/80"
                }`}
              >
                Hidden
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Mode Indicator */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#06a0c7] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-[9998]">
        Visual Editor Active — Draw box to select, double-click to edit text
      </div>

      {selectedElement && !isDragging && !selectionBox?.isFinalized && !showActionMenu && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-background border border-border px-4 py-2 rounded-lg text-sm shadow-lg z-[9998]">
          Selected: &lt;{selectedElement.tagName.toLowerCase()}&gt; — Drag to move, right-click to copy
        </div>
      )}

      {selectionBox?.isFinalized && !isDraggingBox && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-background border border-border px-4 py-2 rounded-lg text-sm shadow-lg z-[9998]">
          {selectionBox.selectedElements?.length || 0} elements selected — Drag box to move all, click outside to
          deselect
        </div>
      )}

      {dragOverImage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-[9998]">
          Drop image to replace
        </div>
      )}
    </div>,
    document.body,
  )
}
