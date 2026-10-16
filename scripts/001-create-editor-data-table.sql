-- Create the editor_data table to store all visual editor changes
-- This will persist positions, images, links, properties, and text changes

CREATE TABLE IF NOT EXISTS editor_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data_type TEXT NOT NULL CHECK (data_type IN ('positions', 'images', 'links', 'properties', 'text')),
  element_id TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(data_type, element_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_editor_data_type ON editor_data(data_type);
CREATE INDEX IF NOT EXISTS idx_editor_data_element ON editor_data(element_id);

-- Enable RLS (Row Level Security) - but allow public read/write since this is admin-only content
ALTER TABLE editor_data ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations (the admin authentication is handled at the API level)
CREATE POLICY "Allow all operations on editor_data" ON editor_data
  FOR ALL
  USING (true)
  WITH CHECK (true);
