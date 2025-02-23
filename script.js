document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Check for saved theme preference
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
        } else {
            localStorage.setItem("dark-mode", "disabled");
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Contact Form Submission Handling with Formspree Integration
    const contactForm = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-button");
    
    if (!contactForm || !submitButton) {
        console.error("Form or submit button not found.");
        return;
    }
    
    const messageBox = document.createElement("p");
    messageBox.id = "form-message";
    contactForm.appendChild(messageBox);
    
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission
        
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        
        const formData = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });
            
            if (response.ok) {
                showMessage("Thank you for your message! I'll get back to you soon.", "success");
                contactForm.reset(); // Clear form after submission
            } else {
                showMessage("Oops! Something went wrong. Please try again.", "error");
            }
        } catch (error) {
            showMessage("Error submitting the form. Please check your connection.", "error");
        }
        
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    });
    
    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.style.color = type === "success" ? "green" : "red";
        messageBox.style.fontWeight = "bold";
        messageBox.style.marginTop = "10px";
        
        setTimeout(() => {
            messageBox.textContent = "";
        }, 4000); // Hide message after 4 seconds
    }
});
