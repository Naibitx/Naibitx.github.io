// Initialize Feather Icons
document.addEventListener("DOMContentLoaded", () => {
  feather.replace()

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Initialize the portfolio functionality
  initNavbar()
  initHero3D()
  initGallery()
  initContactForm()
  initToast()
})

// Navbar functionality
function initNavbar() {
  const navbar = document.querySelector(".navbar")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".mobile-nav")
  const navLinks = document.querySelectorAll(".nav-link")

  // Handle navbar background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active")

    // Toggle icon between menu and x
    const icon = mobileMenuBtn.querySelector("i")
    if (mobileNav.classList.contains("active")) {
      icon.setAttribute("data-feather", "x")
    } else {
      icon.setAttribute("data-feather", "menu")
    }
    feather.replace()
  })

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.setAttribute("data-feather", "menu")
      feather.replace()
    })
  })
}

// 3D Cube in Hero section
function initHero3D() {
  const canvas = document.getElementById("cube-canvas")

  if (!canvas) return

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
  camera.position.z = 5

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 10, 5)
  scene.add(directionalLight)

  // Create wireframe cube
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ffaa,
    wireframe: true,
    emissive: 0x00ffaa,
    emissiveIntensity: 0.5,
  })

  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.005
    cube.rotation.y += 0.005

    renderer.render(scene, camera)
  }

  // Handle resize
  function handleResize() {
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
  }

  window.addEventListener("resize", handleResize)
  handleResize()
  animate()
}

// Gallery functionality
function initGallery() {
  // Sample gallery data - replace with your own
  const galleryItems = [
    {
      id: 1,
      title: "SHPE : Lets Get This Breadboard",
      description: "This is a SHPE Valentines Day Technology event poster. ",
      category: "poster",
      image: "assets/Valentines Day 2025 Event Print.png",
      link: "assets/Valentines Day 2025 Event Print.png",
    },
    {
      id: 2,
      title: "Fluffy Bytes",
      description: "Repsonsive mock website for a Web Developing company, it has testimonials and reviews, about page and services",
      category: "website",
      image: "assets/mockcutewebsite business.png",
      link: "assets/mock website business - Made with Clipchamp.mp4",
      
    },
    {
      id: 3,
      title: "Be My Guest Website",
      description: "Responsive picnic booking website. Implemented Home, Policies, Booking , Packages and Contact us pages. Helped organize business and logo creation",
      category: "website",
      image: "assets/bemyguest.png",
      link: "assets/bemyguest.png",
    },
    {
      id: 4,
      title: "Whiting Turner Workshop Poster",
      description: "Poster/ Flyer for Whiting Turner Workshop for Resume Reviews.",
      category: "poster",
      image: "assets/wWhiting turner resume workshop.png",
      link: "assets/wWhiting turner resume workshop.png",
    },
    {
      id: 5,
      title: "AMRS Construciton Company",
      description: "Repsonsive website for construction company.",
      category: "website",
      image: "assets/amrs.png",
      link: "assets/amrs.png",
      
    },
    
  ]

  const galleryGrid = document.querySelector(".gallery-grid")
  const galleryTabs = document.querySelectorAll(".gallery-tab")
  const galleryModal = document.getElementById("gallery-modal")
  const addItemModal = document.getElementById("add-item-modal")
  const addItemBtn = document.querySelector(".add-item-btn")
  const closeModalBtns = document.querySelectorAll(".close-modal")
  const addItemForm = document.getElementById("add-item-form")
  const fileInput = document.getElementById("item-image")
  const fileUploadContainer = document.getElementById("file-upload-container")
  const filePreview = document.querySelector(".file-preview")
  const fileName = document.querySelector(".file-name")

  let currentFilter = "all"
  let nextItemId = galleryItems.length + 1

  // Render gallery items
  function renderGalleryItems() {
    galleryGrid.innerHTML = ""

    const filteredItems =
      currentFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === currentFilter)

    filteredItems.forEach((item) => {
      const galleryItem = document.createElement("div")
      galleryItem.className = "gallery-item"
      galleryItem.dataset.id = item.id

      galleryItem.innerHTML = `
                <div class="gallery-item-image">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="gallery-item-overlay">
                        <button class="btn btn-outline btn-sm">
                            <i data-feather="external-link"></i>
                            View
                        </button>
                    </div>
                    <div class="gallery-item-category">${item.category}</div>
                </div>
                <div class="gallery-item-content">
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <p class="gallery-item-description">${item.description}</p>
                </div>
            `

      galleryGrid.appendChild(galleryItem)

      // Add click event to open modal
      galleryItem.addEventListener("click", () => {
        openGalleryItemModal(item)
      })

      // Prevent modal from opening when clicking the view button
      const viewBtn = galleryItem.querySelector(".btn")
      viewBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        window.open(item.link, "_blank")
      })
    })

    // Re-initialize feather icons
    feather.replace()
  }

  // Open gallery item modal
  function openGalleryItemModal(item) {
    const modalTitle = galleryModal.querySelector(".modal-title")
    const modalCategory = galleryModal.querySelector(".modal-category")
    const modalImage = galleryModal.querySelector(".modal-image")
    const modalDescription = galleryModal.querySelector(".modal-description")
    const modalLink = galleryModal.querySelector(".modal-link")
    const modalLinkText = galleryModal.querySelector(".modal-link-text")

    modalTitle.textContent = item.title
    modalCategory.textContent = item.category === "poster" ? "Poster/Flyer Design" : "Website Project"
    modalImage.src = item.image
    modalImage.alt = item.title
    modalDescription.textContent = item.description

    if (item.link && item.link !== "#") {
      modalLink.href = item.link
      modalLink.style.display = "inline-flex"
      modalLinkText.textContent = item.category === "website" ? "Visit Website" : "View Full Size"
    } else {
      modalLink.style.display = "none"
    }

    galleryModal.classList.add("active")
  }

  // Filter gallery items
  galleryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      galleryTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")

      currentFilter = tab.dataset.filter
      renderGalleryItems()
    })
  })

  // Add new item button
  addItemBtn.addEventListener("click", () => {
    addItemModal.classList.add("active")
  })

  // Close modals
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      galleryModal.classList.remove("active")
      addItemModal.classList.remove("active")
    })
  })

  // File input change
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      fileName.textContent = file.name
      filePreview.style.display = "block"
    }
  })

  // Click on file upload container
  fileUploadContainer.addEventListener("click", () => {
    fileInput.click()
  })

  // Add item form submit
  addItemForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const title = document.getElementById("item-title").value
    const category = document.getElementById("item-category").value
    const description = document.getElementById("item-description").value
    const link = document.getElementById("item-link").value || "#"

    // In a real application, you would handle file upload to a server
    // For this demo, we'll just use a placeholder
    const image = "https://via.placeholder.com/600x400"

    const newItem = {
      id: nextItemId++,
      title,
      description,
      category,
      image,
      link,
    }

    galleryItems.push(newItem)
    renderGalleryItems()

    // Reset form
    addItemForm.reset()
    filePreview.style.display = "none"
    addItemModal.classList.remove("active")

    // Show success toast
    showToast("Success!", "Your item has been added to the gallery.")
  })

  // Initial render
  renderGalleryItems()
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contact-form")

  if (!contactForm) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // In a real application, you would send the form data to a server
    // For this demo, we'll just simulate a successful submission

    // Get form data
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalBtnText = submitBtn.innerHTML

    submitBtn.disabled = true
    submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
            Sending...
        `

    setTimeout(() => {
      // Reset form
      contactForm.reset()

      // Reset button
      submitBtn.disabled = false
      submitBtn.innerHTML = originalBtnText

      // Show success toast
      showToast("Message sent!", "Thank you for your message. I'll get back to you soon.")
    }, 1500)
  })
}

// Toast notification functionality
function initToast() {
  window.showToast = (title, message) => {
    const toast = document.getElementById("toast")
    const toastTitle = toast.querySelector(".toast-title")
    const toastMessage = toast.querySelector(".toast-message")
    const toastClose = toast.querySelector(".toast-close")

    toastTitle.textContent = title
    toastMessage.textContent = message

    toast.classList.add("active")

    // Auto hide after 5 seconds
    const toastTimeout = setTimeout(() => {
      toast.classList.remove("active")
    }, 5000)

    // Close button
    toastClose.addEventListener("click", () => {
      toast.classList.remove("active")
      clearTimeout(toastTimeout)
    })
  }
}
