      //
      document
        .getElementById("applicationForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          //
          const formData = new FormData(this);
          const data = Object.fromEntries(formData);

          //
          if (
            !data.firstName ||
            !data.lastName ||
            !data.email ||
            !data.position ||
            !data.experience ||
            !data.skills ||
            !data.coverLetter
          ) {
            alert("Please fill in all required fields.");
            return;
          }

          //
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(data.email)) {
            alert("Please enter a valid email address.");
            return;
          }

          //
          const submitButton = this.querySelector('button[type="submit"]');
          submitButton.textContent = "Submitting...";
          submitButton.disabled = true;

          setTimeout(() => {
            alert(
              "Thank you for your application! We'll review your submission and contact you within 5-7 business days."
            );
            this.reset();
            submitButton.textContent = "Submit Application";
            submitButton.disabled = false;
          }, 2000);
        });

      //
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      //
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      }, observerOptions);

      //
      document
        .querySelectorAll(".section, .team-card, .job-card, .resource-card")
        .forEach((el) => {
          observer.observe(el);
        });

      //
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      document.getElementById("availability").min = nextWeek
        .toISOString()
        .split("T")[0];

      //
      function trackEvent(eventName, properties) {
        console.log("Analytics Event:", eventName, properties);
      }

      //
      document
        .querySelectorAll(
          "#applicationForm input, #applicationForm select, #applicationForm textarea"
        )
        .forEach((field) => {
          field.addEventListener("focus", () => {
            trackEvent("form_field_focus", { field: field.name });
          });
        });

      //
      document
        .querySelectorAll(".btn-primary, .cta-button")
        .forEach((button) => {
          button.addEventListener("click", () => {
            trackEvent("cta_click", { button_text: button.textContent.trim() });
          });
        });