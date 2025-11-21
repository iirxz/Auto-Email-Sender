document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const statusMessage = document.getElementById("status-message");

    // --- IMPORTANT ---
    // Change this to your Vercel/Netlify function URL
    // It will look like: https://your-project-name.vercel.app/api/send-email
    const BACKEND_URL = "/api/send-email"; 

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // 1. Disable button and show loading
        submitBtn.disabled = true;
        statusMessage.style.color = "#333";
        statusMessage.textContent = "Sending...";

        // 2. Get data from form
        const formData = {
            email_to: document.getElementById("email_to").value,
            subject: document.getElementById("subject").value,
            body_content: document.getElementById("body_content").value,
        };

        try {
            // 3. Send data to the backend
            const response = await fetch(BACKEND_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Success!
                statusMessage.style.color = "green";
                statusMessage.textContent = "Email sent successfully!";
                form.reset();
            } else {
                // Server error
                throw new Error("Failed to send email. Please try again.");
            }
        } catch (error) {
            // Network error
            console.error(error);
            statusMessage.style.color = "red";
            statusMessage.textContent = error.message;
        } finally {
            // 4. Re-enable button
            submitBtn.disabled = false;
        }
    });
});
