// Animation functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  initScrollAnimations()
  initTypingEffect()
})

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".section-header, .card, .skill-category, .experience-card, .project-container, .cert-card, .org-card, .contact-container",
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animatedElements.forEach((element) => {
    element.classList.add("animate-element")
    observer.observe(element)
  })

  // Add CSS for animations
  const style = document.createElement("style")
  style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `
  document.head.appendChild(style)
}

// Typing effect for hero section
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-effect")

  if (!typingElement) return

  const text = typingElement.textContent
  typingElement.textContent = ""
  typingElement.style.width = "0"

  let charIndex = 0
  const typingSpeed = 100 // milliseconds per character

  function typeChar() {
    if (charIndex < text.length) {
      typingElement.textContent += text.charAt(charIndex)
      charIndex++
      setTimeout(typeChar, typingSpeed)
    }
  }

  // Start typing after a short delay
  setTimeout(typeChar, 1000)
}
