export interface FaqItem {
  question: string
  answer: string
  link?: { label: string; href: string }
}

export const FAQ: FaqItem[] = [
  {
    question: "Will my client know Ghostwright is involved?",
    answer:
      "No. In every option, your clients only ever see your name. By default we never contact them. While we work together, we never solicit, market to, or upsell your clients.",
  },
  {
    question: "Do I have to be the go-between with my clients?",
    answer:
      "By default, yes: you are our only contact. If you'd rather not be, we can work directly with your client as your web team, from an email address on your domain. They only ever see your name. See Ways to Work.",
    link: { label: "Ways to Work", href: "/ways-to-work" },
  },
  {
    question: "Does working with my clients directly cost extra?",
    answer: "No. Pricing is the same either way.",
  },
  {
    question: "Who owns the domain?",
    answer:
      "The client owns it and registers it in their own account. We give you the exact DNS records and steps for your team to walk them through.",
  },
  {
    question: "How do I get started as a partner?",
    answer:
      "Download the Partner Service Agreement, fill it in, sign it, and email it to hello@ghostwrightweb.com. We confirm by email, set up your intake subdomain, and you can start sending clients.",
    link: { label: "Partner Service Agreement", href: "/partner-service-agreement" },
  },
  {
    question: "How does my client's intake form work?",
    answer:
      "You send your client one link to a short form for their trade, on a subdomain of your website. It adapts to their answers, takes about 10 minutes, and sends everything to us.",
    link: { label: "intake form", href: "/intake" },
  },
  {
    question: "What does the intake ask for?",
    answer:
      "Business and contact details, service area, licenses and insurance, services, logo and photos, reviews, how customers reach them, domain and email setup, and timing. It never asks for passwords or payment details.",
  },
  {
    question: "How do I set up the intake on my domain?",
    answer:
      "Add one DNS record for a subdomain such as start.youragency.com. We add it on our side and test it.",
  },
  {
    question: "Is there a minimum volume requirement?",
    answer:
      "No minimum. The program fits best for agencies onboarding new contractors every month.",
  },
  {
    question: "What does the monthly fee include?",
    answer:
      "Hosting, SSL, infrastructure, technical support, and content edits for each active site. Content edits are usually done in 2 to 3 business days.",
  },
  {
    question: "Who is the partnership for?",
    answer:
      "Agencies that onboard new contractors, such as insurance, business-setup, lead-generation, and marketing agencies, and want to add websites without a web team.",
  },
  {
    question: "Can the websites be presented under our brand?",
    answer:
      "Yes. You set the retail price, bill your client, and own the relationship. Your client completes an intake form for their trade, on a subdomain of your website.",
  },
  {
    question: "What do you handle?",
    answer:
      "Custom design and build from scratch, hosting, SSL, deployment, mobile-responsive layouts, contact forms, SEO-ready structure, and content edits after launch.",
  },
  {
    question: "How do contact forms work?",
    answer:
      "Each site's contact form sends messages through an EmailJS account that your client owns, to the address you choose. Messages go straight to your client and never pass through us. We test every form before launch.",
  },
  {
    question: "Do you use AI-generated images?",
    answer:
      "Only if your client allows it, and only for backgrounds, textures, and illustrations. Photos your client sends are improved for quality only and still show exactly the same thing. We never use generated images to show their work, team, or reviews.",
  },
  {
    question: "What does partner pricing look like?",
    answer:
      "$149 setup per site, invoiced when the intake arrives; work starts once it's paid. Then $25 per active site per month, starting on the 1st of the month after the site goes live. The launch month is free. You get one bundled invoice on the 1st of each month, due by the 8th. Suggested retail is $199–$299 setup and $49–$79/month.",
  },
  {
    question: "How quickly can a website be delivered?",
    answer:
      "The first version arrives within 5–7 business days of your greenlight, which is a completed intake plus a paid setup invoice.",
  },
  {
    question: "How do revisions work?",
    answer:
      "Each site includes two rounds. You send one consolidated list per round, and we deliver each revised version within 3 business days. Feedback is due within 5 business days of each delivery, or that version is treated as approved. Additional rounds are $75 each. New pages, features, and redesigns are quoted separately. If you choose the web-team option, your client can send the list to your team's address and we work from it.",
  },
  {
    question: "Can we request edits after launch?",
    answer:
      "Yes. Content edits (text, images, hours, service areas, contact info) are usually done in 2 to 3 business days. Requests come from you, or from your client if you chose the web-team option. New major service pages, features, integrations, and redesigns are quoted separately.",
  },
  {
    question: "What if my client doesn't pay me?",
    answer:
      "Tell us before the invoice due date which site is unpaid. We remove that site's monthly fee from the invoice, and the site follows a 30-day and 60-day warning schedule. You still pay the rest of the invoice by the due date.",
  },
  {
    question: "What happens if we cancel a site?",
    answer:
      "Cancel any site anytime with written notice. It goes offline at the end of that calendar month and isn't invoiced for later months. The client keeps their domain and their own content. Ghostwright keeps the source code.",
  },
  {
    question: "Can we buy the source code?",
    answer:
      "You can buy a site's source code for $3,000 per site while the site is active. For a cancelled site, you have 30 days from your cancellation notice to complete the buyout. Buying the code doesn't cancel hosting; you cancel separately. Pricing and steps are in your Partner Service Agreement.",
    link: { label: "Partner Service Agreement", href: "/partner-service-agreement" },
  },
  {
    question: "Is the setup fee refundable?",
    answer: "The setup fee covers the custom build and is non-refundable once work begins.",
  },
]
