import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";
import { apiFetch } from "../../services/api";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiCheck,
  FiArrowRight,
  FiMessageCircle,
  FiMail,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiUser,
  FiCopy,
  FiLogIn,
  FiZap,
  FiCode,
  FiTrendingUp,
  FiTarget,
  FiUsers,
  FiAward,
  FiBook,
  FiLayers,
  FiClock,
  FiStar,
} from "react-icons/fi";
import "../../styles/academy-tokens.css";
import "../../styles/parallax-slider.css";

export default function AcademyPage() {
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Courses Data
  const courses = [
    {
      id: "fullstack",
      name: "Full Stack Development",
      description: "Master frontend and backend technologies. Build real-world applications from scratch with React, Node.js, and modern tools.",
      duration: "6 months",
      level: "Beginner to Advanced",
      students: "2,400+",
      badge: "Popular",
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      features: [
        "Complete React & Node.js curriculum",
        "10+ real-world projects",
        "1-on-1 mentorship",
        "Certificate of completion",
        "Job placement support",
        "Lifetime access",
      ],
      highlighted: true,
    },
    {
      id: "datascience",
      name: "Data Science & ML",
      description: "Learn data analysis, machine learning, and AI. Work on industry projects and build ML models from scratch.",
      duration: "8 months",
      level: "Intermediate",
      students: "1,850+",
      badge: "Trending",
      price: 399,
      originalPrice: 499,
      rating: 4.8,
      features: [
        "Python & ML fundamentals",
        "TensorFlow & PyTorch",
        "Data visualization",
        "Industry projects",
        "ML model deployment",
        "Career guidance",
      ],
      highlighted: false,
    },
    {
      id: "devops",
      name: "DevOps & Cloud",
      description: "Master cloud infrastructure, CI/CD, and deployment. Get AWS/GCP certified and deploy scalable applications.",
      duration: "4 months",
      level: "Intermediate",
      students: "1,200+",
      badge: "New",
      price: 349,
      originalPrice: 449,
      rating: 4.7,
      features: [
        "AWS & GCP certification prep",
        "Docker & Kubernetes",
        "CI/CD pipelines",
        "Infrastructure as Code",
        "Monitoring & logging",
        "Cloud security",
      ],
      highlighted: false,
    },
  ];

  // Features Data
  const features = [
    {
      title: "Unlock Turbo Coding",
      description: "Member-exclusive high-speed models engineered to drop into any dev workflow, answer faster and more reliably, and get programming tasks done in record time.",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #E9C39F 100%)",
      icon: "⚡",
      content: {
        plan: "Allegretto",
        model: "K2 Turbo",
        modelType: "High speed model",
      },
    },
    {
      title: "Dedicated Console, Crystal Clear",
      description: "Real-time balance, logs, and quotas visible, quotas and pace at your fingertips. Track your usage and manage your API keys seamlessly.",
      gradient: "linear-gradient(135deg, #B6D395 0%, #D6FFA4 100%)",
      icon: "🖥️",
      content: {
        weeklyBalance: "1024/7168",
        limits: "270/500",
        resetTime: "Resets in 120 hours",
        limitsReset: "Resets in 3 hours",
      },
    },
  ];

  // Setup Steps
  const setupSteps = [
    {
      step: 1,
      title: "Browse Courses",
      description: "Explore our comprehensive course catalog. From beginner to advanced, find the perfect learning path for your career goals.",
      buttonText: "View Courses",
      buttonAction: () => {
        document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      step: 2,
      title: "Enroll & Start Learning",
      description: "Choose your course, enroll instantly, and start learning immediately. Access all materials 24/7 from anywhere.",
      buttonText: "Get Started",
      buttonAction: () => {
        if (token) {
          navigate("/lms/student/courses");
        } else {
          navigate("/login");
        }
      },
    },
    {
      step: 3,
      title: "Build Your Portfolio",
      description: "Complete real-world projects, get certified, and build a portfolio that gets you hired. We provide career support every step of the way.",
      buttonText: "Learn More",
      buttonAction: () => {
        window.open("https://docs.expograph.com", "_blank");
      },
    },
  ];

  // FAQs
  const faqs = [
    {
      question: "What are the prerequisites for joining ExpoGraph Academy?",
      answer: "No prior programming experience is required for our beginner courses. We start from the fundamentals and build up. For advanced programs, basic knowledge of programming concepts is recommended.",
    },
    {
      question: "Are the courses self-paced or instructor-led?",
      answer: "We offer both options. Most courses are self-paced with recorded lectures available 24/7, but we also provide live sessions twice a week and dedicated mentorship support.",
    },
    {
      question: "What kind of certificate will I receive?",
      answer: "Upon completion, you'll receive a verified industry-recognized certificate that you can add to your LinkedIn profile and resume. Our certificates are recognized by 150+ hiring partners.",
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with the course content. No questions asked.",
    },
    {
      question: "How do I get started?",
      answer: "Simply click the 'Get Started' button, create your account in under 2 minutes, and browse our course catalog. You can start learning immediately after enrollment.",
    },
    {
      question: "Do you provide placement assistance?",
      answer: "Yes, we provide comprehensive placement support including resume building, interview preparation, mock interviews, and connections with our hiring partners.",
    },
  ];

  // Handle Contact Form
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactSuccess(false);

    try {
      await apiFetch("/api/v1/public/leads", {
        method: "POST",
        body: {
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          source: "academy_page",
          meta: {
            message: contactForm.message,
            page: "academy",
          },
        },
      });

      setContactSuccess(true);
      setContactForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setContactSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  // WhatsApp
  const whatsappNumber = "919014110638";
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in ExpoGraph Academy!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const getHomePath = () => {
    if (!token) return "/login";
    if (role === "SuperAdmin") return "/lms/superadmin";
    if (role === "Mentor") return "/lms/mentor";
    if (role === "Student") return "/lms/student";
    return "/login";
  };

  // Parallax Slider Component
  const ParallaxSlider = ({ isCompact = false }) => {
    const sliderRef = useRef(null);
    const sliderContainerRef = useRef(null);
    const [curSlide, setCurSlide] = useState(1);
    const [animation, setAnimation] = useState(false);
    const diffRef = useRef(0);
    const startXRef = useRef(0);
    const targetRef = useRef(0);
    const animationRef = useRef(false);
    const curSlideRef = useRef(1);
    const isInSliderSectionRef = useRef(false);
    const scrollLockedRef = useRef(false);
    const autoPlayPausedRef = useRef(false);
    const autoPlayIntervalRef = useRef(null);
    const autoPlayDirectionRef = useRef(true); // true = forward, false = backward
    const animSpd = 750;
    const arrCities = ['Vibe Coder ', 'Prompting', 'Automations'];
    const numOfCities = arrCities.length;
    const winW = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const distOfLetGo = winW * 0.2;
    // Divide cities into parts (original logic - no text breaking)
    const arrCitiesDivided = arrCities.map((city) => {
      const length = city.length;
      const letters = Math.floor(length / 4);
      const exp = new RegExp(".{1," + letters + "}", "g");
      return city.match(exp);
    });

    const goToSlide = (slideNum) => {
      if (animationRef.current) return;
      
      setAnimation(true);
      animationRef.current = true;
      diffRef.current = 0;
      const slider = sliderRef.current;
      if (!slider) return;

      slider.classList.add('animation');
      // Simple transform: slide 1 = 0%, slide 2 = -100%, slide 3 = -200%
      slider.style.transform = `translate3d(-${(slideNum - 1) * 100}%, 0, 0)`;

      // Update background positions for parallax effect (matching original jQuery logic)
      // Original: transform: translate3d((curSlide - direction) * 50%, 0, 0)
      // For goToSlide, we use direction = 1 (same as toDefault)
      // So transform = (slideNum - 1) * 50%
      const darkbgs = slider.querySelectorAll('.parallax-slide__darkbg');
      darkbgs.forEach((bg) => {
        bg.style.transform = `translate3d(${(slideNum - 1) * 50}%, 0, 0)`;
      });

      const letters = slider.querySelectorAll('.parallax-slide__letter');
      letters.forEach((letter) => {
        letter.style.transform = 'translate3d(0, 0, 0)';
      });

      const texts = slider.querySelectorAll('.parallax-slide__text');
      texts.forEach((text) => {
        text.style.transform = 'translate3d(0, 0, 0)';
      });

      setTimeout(() => {
        setAnimation(false);
        animationRef.current = false;
      }, animSpd);
    };

    const navigateRight = () => {
      if (animationRef.current) return;
      setCurSlide((prev) => {
        if (prev >= numOfCities) return prev;
        const newSlide = prev + 1;
        curSlideRef.current = newSlide;
        goToSlide(newSlide);
        return newSlide;
      });
    };

    const navigateLeft = () => {
      if (animationRef.current) return;
      setCurSlide((prev) => {
        if (prev <= 1) return prev;
        const newSlide = prev - 1;
        curSlideRef.current = newSlide;
        goToSlide(newSlide);
        return newSlide;
      });
    };

    const toDefault = () => {
      goToSlide(curSlide);
    };

    const handleMouseDown = (e, target) => {
      if (animationRef.current) return;
      autoPlayPausedRef.current = true; // Pause auto-play on user interaction
      const startX = e.pageX || (e.touches && e.touches[0].pageX);
      startXRef.current = startX;
      targetRef.current = target;
      const slider = sliderRef.current;
      if (!slider) return;

      slider.classList.remove('animation');

      const handleMouseMove = (e) => {
        const x = e.pageX || (e.touches && e.touches[0].pageX);
        const newDiff = startXRef.current - x;
        diffRef.current = newDiff;

        if ((target === 1 && newDiff < 0) || (target === numOfCities && newDiff > 0)) return;

        const currentSlide = curSlide;
        slider.style.transform = `translate3d(-${(currentSlide - 1) * 100 + (newDiff / 30)}%, 0, 0)`;

        const darkbgs = slider.querySelectorAll('.parallax-slide__darkbg');
        darkbgs.forEach((bg) => {
          bg.style.transform = `translate3d(${(currentSlide - 1) * 50 + (newDiff / 60)}%, 0, 0)`;
        });

        const letters = slider.querySelectorAll('.parallax-slide__letter');
        letters.forEach((letter) => {
          letter.style.transform = `translate3d(${newDiff / 60}vw, 0, 0)`;
        });

        const texts = slider.querySelectorAll('.parallax-slide__text');
        texts.forEach((text) => {
          text.style.transform = `translate3d(${newDiff / 15}px, 0, 0)`;
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleMouseUp);

        if (animationRef.current) return;

        const currentDiff = diffRef.current;
        if (currentDiff >= distOfLetGo) {
          navigateRight();
        } else if (currentDiff <= -distOfLetGo) {
          navigateLeft();
        } else {
          toDefault();
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
    };

    const handleNavClick = (target) => {
      if (target === curSlide) return;
      autoPlayPausedRef.current = true; // Pause auto-play on nav click
      curSlideRef.current = target;
      setCurSlide(target);
      goToSlide(target);
    };

    const handleSideNavClick = (direction) => {
      autoPlayPausedRef.current = true; // Pause auto-play on side nav click
      if (direction === 'right') navigateRight();
      if (direction === 'left') navigateLeft();
    };

    useEffect(() => {
      // Initialize slider position
      const slider = sliderRef.current;
      if (slider) {
        curSlideRef.current = curSlide;
        goToSlide(curSlide);
        
        // Initialize background positions for slide 1
        const darkbgs = slider.querySelectorAll('.parallax-slide__darkbg');
        darkbgs.forEach((bg) => {
          bg.style.transform = `translate3d(0%, 0, 0)`;
        });
      }
    }, []);

    // Scroll-based navigation for compact slider (matching original jQuery code)
    useEffect(() => {
      if (!isCompact) return;

      const checkSliderInView = () => {
        if (!sliderContainerRef.current) return false;
        const container = sliderContainerRef.current;
        const rect = container.getBoundingClientRect();
        // Check if slider is FULLY visible and fits to screen height
        const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        const heightMatches = Math.abs(rect.height - window.innerHeight) < 10;
        return isFullyVisible && heightMatches;
      };

      const handleWheel = (e) => {
        if (!checkSliderInView()) {
          isInSliderSectionRef.current = false;
          scrollLockedRef.current = false;
          return;
        }

        isInSliderSectionRef.current = true;
        autoPlayPausedRef.current = true; // Pause auto-play on scroll

        if (animationRef.current) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        // Match original jQuery logic: e.originalEvent.wheelDelta and e.originalEvent.detail
        const delta = e.wheelDelta || -e.detail;
        
        if (delta > 0 || e.detail < 0) {
          // Scrolling up - navigate left
          if (curSlideRef.current > 1) {
            e.preventDefault();
            e.stopPropagation();
            scrollLockedRef.current = true;
            navigateLeft();
          } else {
            scrollLockedRef.current = false;
          }
        } else if (delta < 0 || e.detail > 0) {
          // Scrolling down - navigate right
          if (curSlideRef.current < numOfCities) {
            e.preventDefault();
            e.stopPropagation();
            scrollLockedRef.current = true;
            navigateRight();
          } else {
            scrollLockedRef.current = false;
          }
        }
      };

      // Match original: mousewheel and DOMMouseScroll events
      window.addEventListener('mousewheel', handleWheel, { passive: false });
      window.addEventListener('DOMMouseScroll', handleWheel, { passive: false });

      return () => {
        window.removeEventListener('mousewheel', handleWheel);
        window.removeEventListener('DOMMouseScroll', handleWheel);
      };
    }, [isCompact, numOfCities, curSlide]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.which === 39 || e.which === 37) {
          autoPlayPausedRef.current = true; // Pause auto-play on keyboard
        }
        if (e.which === 39) navigateRight();
        if (e.which === 37) navigateLeft();
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [curSlide, numOfCities]);

    // Auto-play: slides move in a loop every 3 seconds
    useEffect(() => {
      if (!isCompact) return;

      const autoPlay = () => {
        if (autoPlayPausedRef.current || animationRef.current) return;
        
        if (autoPlayDirectionRef.current) {
          // Forward direction: move to next slide
          if (curSlideRef.current >= numOfCities) {
            // Reached last slide, switch to backward direction and start from last slide
            autoPlayDirectionRef.current = false;
            curSlideRef.current = numOfCities;
            setCurSlide(numOfCities);
            goToSlide(numOfCities);
          } else {
            // Move to next slide
            navigateRight();
          }
        } else {
          // Backward direction: move to previous slide
          if (curSlideRef.current <= 1) {
            // Reached first slide, switch to forward direction and start from first slide
            autoPlayDirectionRef.current = true;
            curSlideRef.current = 1;
            setCurSlide(1);
            goToSlide(1);
          } else {
            // Move to previous slide
            navigateLeft();
          }
        }
      };

      // Start auto-play interval (every 3 seconds = 3000ms)
      autoPlayIntervalRef.current = setInterval(autoPlay, 3000);

      return () => {
        if (autoPlayIntervalRef.current) {
          clearInterval(autoPlayIntervalRef.current);
        }
      };
    }, [isCompact, numOfCities, curSlide]);

    return (
      <div 
        ref={sliderContainerRef}
        className={`parallax-slider-cont ${isCompact ? 'parallax-slider-cont--compact' : ''}`}
      >
        <div ref={sliderRef} className={`parallax-slider ${isCompact ? 'parallax-slider--compact' : ''}`}>
          {arrCities.map((city, cityIndex) => {
            const numSlide = cityIndex + 1;
            const firstLetter = arrCitiesDivided[cityIndex][0].charAt(0);
            const isSmall = arrCities[cityIndex].length <= 4;

            return (
              <div
                key={numSlide}
                data-target={numSlide}
                className={`parallax-slide parallax-slide--${numSlide}`}
                onMouseDown={(e) => handleMouseDown(e, numSlide)}
                onTouchStart={(e) => handleMouseDown(e, numSlide)}
              >
                <div className={`parallax-slide__darkbg parallax-slide--${numSlide}__darkbg`}></div>
                <div className={`parallax-slide__text-wrapper parallax-slide--${numSlide}__text-wrapper`}>
                  <div className={`parallax-slide__letter parallax-slide--${numSlide}__letter`}>
                    {firstLetter}
                  </div>
                  {arrCitiesDivided[cityIndex].map((part, partIndex) => (
                    <div
                      key={partIndex}
                      className={`parallax-slide__text parallax-slide__text--${partIndex + 1} ${isSmall ? 'parallax-slide__text--small' : ''}`}
                    >
                      {part}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <ul className="parallax-nav">
          {arrCities.map((_, index) => {
            const numSlide = index + 1;
            return (
              <li
                key={numSlide}
                data-target={numSlide}
                className={`parallax-nav__slide parallax-nav__slide--${numSlide} ${curSlide === numSlide ? 'parallax-nav-active' : ''}`}
                onClick={() => handleNavClick(numSlide)}
              ></li>
            );
          })}
        </ul>
        <div
          data-target="right"
          className="parallax-side-nav parallax-side-nav--right"
          onClick={() => handleSideNavClick('right')}
        ></div>
        <div
          data-target="left"
          className="parallax-side-nav parallax-side-nav--left"
          onClick={() => handleSideNavClick('left')}
        ></div>
      </div>
    );
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-dm)",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-secondary)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "relative",
          width: "100%",
          background: "var(--bg-primary)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: "1600px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                padding: "6px 12px",
                borderRadius: "var(--radius-full)",
                fontWeight: "700",
                fontSize: "var(--font-size-lg)",
                fontFamily: "var(--font-dm)",
              }}
            >
              EXPOGRAPH
            </div>
            <span
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-lg)",
                fontWeight: "600",
                fontFamily: "var(--font-dm)",
              }}
            >
              Academy
            </span>
          </Link>

          {/* Navigation */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              fontFamily: "var(--font-dm)",
            }}
          >
            <Link
              to="#features"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "var(--font-size-base)",
                fontFamily: "var(--font-dm)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Features
            </Link>
            <Link
              to="/courses"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "var(--font-size-base)",
                fontFamily: "var(--font-dm)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Courses
            </Link>
            {token ? (
              <Link
                to={getHomePath()}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "var(--font-size-base)",
                  fontFamily: "var(--font-dm)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "var(--bg-level-4)",
                  color: "var(--text-secondary)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--font-size-base)",
                  fontFamily: "var(--font-dm)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--bg-level-5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "var(--bg-level-4)";
                }}
              >
                <FiLogIn size={16} style={{ marginRight: "8px", display: "inline" }} />
                Login
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: "120px 24px",
          textAlign: "center",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "var(--font-size-4xl)",
              fontWeight: "700",
              color: "var(--text-secondary)",
              marginBottom: "24px",
              fontFamily: "var(--font-dm)",
              lineHeight: "1.2",
            }}
          >
            ExpoGraph
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "var(--font-size-xl)",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "40px",
              maxWidth: "800px",
              margin: "0 auto 40px",
              lineHeight: "1.6",
              fontFamily: "var(--font-dm)",
            }}
          >
            A coding-focused academy engineered to drop into any dev workflow, answer faster and more reliably, and get programming tasks done in record time.
          </motion.p>
          
          {/* Parallax Slider in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              marginTop: "60px",
              marginBottom: "40px",
            }}
          >
            <ParallaxSlider isCompact={true} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <button
              onClick={() => {
                document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "12px 24px",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-secondary)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--font-size-base)",
                fontFamily: "var(--font-dm)",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--bg-level-4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "var(--bg-primary)";
              }}
            >
              Explore Courses
            </button>
            <button
              onClick={() => {
                if (token) {
                  navigate("/lms/student/courses");
                } else {
                  navigate("/login");
                }
              }}
              style={{
                padding: "12px 24px",
                backgroundColor: "var(--bg-level-3)",
                color: "var(--text-secondary)",
                border: "none",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--font-size-base)",
                fontFamily: "var(--font-dm)",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
              }}
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* One Subscription Section */}
      <section
        style={{
          padding: "80px 24px",
          backgroundColor: "var(--bg-level-4)",
        }}
      >
        <div style={{ maxWidth: "1600px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <h2
              style={{
                fontSize: "var(--font-size-3xl)",
                fontWeight: "700",
                color: "var(--text-secondary)",
                marginBottom: "24px",
                fontFamily: "var(--font-dm)",
              }}
            >
              One subscription, code everywhere.
            </h2>
            <p
              style={{
                fontSize: "var(--font-size-base)",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: "1.6",
                marginBottom: "32px",
                fontFamily: "var(--font-dm)",
              }}
            >
              ExpoGraph CLI / Claude Code / Roo Code ready to use ExpoGraph code capabilities seamlessly integrated into every commit.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                backgroundColor: "var(--bg-primary)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "var(--font-size-sm)",
                color: "var(--text-secondary)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                maxWidth: "fit-content",
              }}
            >
              <code style={{ fontFamily: "var(--font-jetbrains)" }}>uv tool install --python 3.13 expograph-cli</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("uv tool install --python 3.13 expograph-cli");
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <FiCopy size={16} />
              </button>
            </div>
          </div>
          <div>
            {/* Console UI */}
            <div
              style={{
                backgroundColor: "var(--bg-level-4)",
                borderRadius: "var(--radius-md)",
                border: "2px solid var(--bg-level-3)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Window Controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 16px",
                  backgroundColor: "var(--bg-primary)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FF5F57" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#28CA42" }} />
              </div>
              {/* Console Content */}
              <div style={{ padding: "24px", fontFamily: "var(--font-jetbrains)", fontSize: "var(--font-size-sm)" }}>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ color: "var(--bg-level-3)", marginBottom: "8px" }}>Welcome to ExpoGraph CLI!</div>
                  <div style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "16px" }}>Send /help for help information.</div>
                </div>
                <div style={{ color: "var(--text-secondary)", marginBottom: "8px" }}>Model: expograph-k2-thinking-turbo</div>
                <div style={{ color: "rgba(255, 255, 255, 0.6)", marginBottom: "16px" }}>
                  moonshot@moonshot /setup
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  <div style={{ marginBottom: "8px" }}>1. ExpoGraph Academy</div>
                  <div style={{ marginBottom: "8px", color: "var(--bg-level-3)" }}>2. Moonshot AI Open Platform (moonshot.cn)</div>
                  <div style={{ color: "rgba(255, 255, 255, 0.6)" }}>3. Moonshot AI Open Platform (moonshot.ai)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" style={{ padding: "80px 24px", backgroundColor: "var(--bg-primary)" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "80px" }}>
            {/* Unlock Turbo Coding Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: features[0].gradient,
                borderRadius: "var(--radius-md)",
                padding: "40px",
                boxShadow: "var(--shadow-sm)",
                color: "var(--text-secondary)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--font-size-3xl)",
                  fontWeight: "700",
                  marginBottom: "16px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                {features[0].title}
              </h3>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  marginBottom: "32px",
                  lineHeight: "1.6",
                  opacity: 0.9,
                  fontFamily: "var(--font-dm)",
                }}
              >
                {features[0].description}
              </p>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "var(--radius-sm)",
                  padding: "24px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: "var(--font-size-sm)", marginBottom: "12px", opacity: 0.8 }}>Model Access</div>
                <div style={{ fontSize: "var(--font-size-lg)", marginBottom: "8px" }}>
                  My Plan: <strong>{features[0].content.plan}</strong>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "var(--bg-level-3)",
                    color: "var(--text-secondary)",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "var(--font-size-base)",
                    fontWeight: "600",
                    marginTop: "8px",
                  }}
                >
                  {features[0].content.model}
                </div>
                <div style={{ fontSize: "var(--font-size-sm)", marginTop: "8px", opacity: 0.8 }}>
                  {features[0].content.modelType}
                </div>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  backgroundColor: "var(--bg-level-4)",
                  color: "var(--text-secondary)",
                  border: "none",
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--font-size-base)",
                  fontFamily: "var(--font-dm)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--bg-level-5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "var(--bg-level-4)";
                }}
              >
                + New API Key
              </button>
            </motion.div>

            {/* Dedicated Console Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                background: features[1].gradient,
                borderRadius: "var(--radius-md)",
                padding: "40px",
                boxShadow: "var(--shadow-sm)",
                color: "var(--text-secondary)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--font-size-3xl)",
                  fontWeight: "700",
                  marginBottom: "16px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                {features[1].title}
              </h3>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  marginBottom: "32px",
                  lineHeight: "1.6",
                  opacity: 0.9,
                  fontFamily: "var(--font-dm)",
                }}
              >
                {features[1].description}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "var(--radius-sm)",
                    padding: "20px",
                  }}
                >
                  <div style={{ fontSize: "var(--font-size-sm)", marginBottom: "8px", opacity: 0.8 }}>Weekly Balance</div>
                  <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: "700", marginBottom: "4px" }}>
                    {features[1].content.weeklyBalance}
                  </div>
                  <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.7 }}>{features[1].content.resetTime}</div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "var(--radius-sm)",
                    padding: "20px",
                  }}
                >
                  <div style={{ fontSize: "var(--font-size-sm)", marginBottom: "8px", opacity: 0.8 }}>Limits</div>
                  <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: "700", marginBottom: "4px" }}>
                    {features[1].content.limits}
                  </div>
                  <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.7 }}>{features[1].content.limitsReset}</div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "var(--radius-sm)",
                  padding: "20px",
                }}
              >
                <div style={{ fontSize: "var(--font-size-base)", fontWeight: "600", marginBottom: "12px" }}>API Keys</div>
                <div style={{ fontSize: "var(--font-size-sm)", opacity: 0.8, lineHeight: "1.6" }}>
                  New API keys are displayed only once. Please save this key to access your ExpoGraph Academy benefits via the CLI and integrations.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3-Step Setup Section */}
      <section style={{ padding: "80px 24px", backgroundColor: "var(--bg-level-4)" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "var(--font-size-3xl)",
              fontWeight: "700",
              color: "var(--text-secondary)",
              textAlign: "center",
              marginBottom: "60px",
              fontFamily: "var(--font-dm)",
            }}
          >
            3-step setup, start coding in seconds
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {setupSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  backgroundColor: "var(--bg-level-4)",
                  borderRadius: "var(--radius-md)",
                  padding: "32px",
                  boxShadow: "var(--shadow-sm)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-16px",
                    left: "24px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-level-3)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "var(--font-size-lg)",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {step.step}
                </div>
                <h3
                  style={{
                    fontSize: "var(--font-size-xl)",
                    fontWeight: "700",
                    color: "var(--text-secondary)",
                    marginTop: "24px",
                    marginBottom: "16px",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "24px",
                    lineHeight: "1.6",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {step.description}
                </p>
                <button
                  onClick={step.buttonAction}
                  style={{
                    width: "100%",
                    padding: "12px 24px",
                    backgroundColor: "var(--bg-level-5)",
                    color: "var(--text-secondary)",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    fontSize: "var(--font-size-base)",
                    fontFamily: "var(--font-dm)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "var(--palette-mixed-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "var(--bg-level-5)";
                  }}
                >
                  {step.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses-section" style={{ padding: "80px 24px", backgroundColor: "var(--bg-primary)", position: "relative" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: "var(--font-size-4xl)",
                fontWeight: "700",
                color: "var(--text-secondary)",
                marginBottom: "32px",
                fontFamily: "var(--font-dm)",
              }}
            >
              Explore Our Courses
            </h2>
          </div>

          {/* Course Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", marginTop: "60px" }}>
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  backgroundColor: "var(--bg-level-4)",
                  borderRadius: "var(--radius-md)",
                  padding: "40px",
                  boxShadow: "var(--shadow-sm)",
                  border: course.highlighted ? "2px solid var(--bg-level-3)" : "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <h3
                    style={{
                      fontSize: "var(--font-size-2xl)",
                      fontWeight: "700",
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    {course.name}
                  </h3>
                  {course.badge && (
                    <span
                      style={{
                        padding: "4px 12px",
                        backgroundColor: "var(--bg-level-3)",
                        color: "var(--text-secondary)",
                        borderRadius: "var(--radius-full)",
                        fontSize: "var(--font-size-xs)",
                        fontWeight: "600",
                        fontFamily: "var(--font-dm)",
                      }}
                    >
                      {course.badge}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "24px",
                    lineHeight: "1.6",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {course.description}
                </p>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
                    <span
                      style={{
                        fontSize: "var(--font-size-3xl)",
                        fontWeight: "700",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-dm)",
                      }}
                    >
                      ${course.price}
                    </span>
                    <span
                      style={{
                        fontSize: "var(--font-size-lg)",
                        color: "rgba(255, 255, 255, 0.5)",
                        textDecoration: "line-through",
                        fontFamily: "var(--font-dm)",
                      }}
                    >
                      ${course.originalPrice}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "var(--font-size-sm)", color: "rgba(255, 255, 255, 0.6)", fontFamily: "var(--font-dm)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <FiClock size={14} />
                      {course.duration}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <FiUsers size={14} />
                      {course.students}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <FiStar size={14} style={{ color: "#F59E0B" }} />
                      {course.rating}
                    </span>
                  </div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "32px 0" }}>
                  {course.features.map((feature, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginBottom: "16px",
                        fontSize: "var(--font-size-base)",
                        fontFamily: "var(--font-dm)",
                      }}
                    >
                      <FiCheck
                        style={{
                          color: "var(--palette-green-200)",
                          fontSize: "20px",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <span style={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.5" }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (token) {
                      navigate("/lms/student/courses");
                    } else {
                      navigate("/login");
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    background: course.highlighted
                      ? "linear-gradient(135deg, var(--bg-level-3) 0%, var(--palette-blue-500) 100%)"
                      : "linear-gradient(135deg, var(--bg-level-5) 0%, var(--palette-mixed-700) 100%)",
                    color: "var(--text-secondary)",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    fontSize: "var(--font-size-base)",
                    fontFamily: "var(--font-dm)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = "1";
                  }}
                >
                  Enroll Now
                  <FiArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section style={{ padding: "80px 24px", backgroundColor: "var(--bg-level-4)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "var(--font-size-3xl)",
              fontWeight: "700",
              color: "var(--text-secondary)",
              textAlign: "center",
              marginBottom: "60px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderRadius: "var(--radius-sm)",
                  padding: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "var(--text-secondary)",
                    fontSize: "var(--font-size-lg)",
                    fontFamily: "var(--font-dm)",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>{faq.question}</span>
                  <FiChevronDown
                    style={{
                      transform: expandedFaq === index ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "var(--font-size-base)",
                      lineHeight: "1.6",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: "80px 24px", backgroundColor: "var(--bg-primary)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "var(--font-size-3xl)",
              fontWeight: "700",
              color: "var(--text-secondary)",
              textAlign: "center",
              marginBottom: "40px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Get in Touch
          </h2>
          <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <input
              type="text"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
              style={{
                padding: "14px 20px",
                backgroundColor: "var(--bg-level-4)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-base)",
                fontFamily: "var(--font-dm)",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
              style={{
                padding: "14px 20px",
                backgroundColor: "var(--bg-level-4)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-base)",
                fontFamily: "var(--font-dm)",
              }}
            />
            <input
              type="tel"
              placeholder="Your Phone"
              value={contactForm.phone}
              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              style={{
                padding: "14px 20px",
                backgroundColor: "var(--bg-level-4)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-base)",
                fontFamily: "var(--font-dm)",
              }}
            />
            <textarea
              placeholder="Your Message"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              rows={6}
              required
              style={{
                padding: "14px 20px",
                backgroundColor: "var(--bg-level-4)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-base)",
                fontFamily: "var(--font-dm)",
                resize: "vertical",
              }}
            />
            <button
              type="submit"
              disabled={contactSubmitting}
              style={{
                padding: "14px 24px",
                backgroundColor: "var(--bg-level-3)",
                color: "var(--text-secondary)",
                border: "none",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--font-size-base)",
                fontFamily: "var(--font-dm)",
                fontWeight: "600",
                cursor: contactSubmitting ? "not-allowed" : "pointer",
                opacity: contactSubmitting ? 0.6 : 1,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!contactSubmitting) e.target.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                if (!contactSubmitting) e.target.style.opacity = "1";
              }}
            >
              {contactSubmitting ? "Sending..." : contactSuccess ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "60px 24px 40px",
          backgroundColor: "var(--bg-level-4)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginBottom: "40px" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    fontWeight: "700",
                    fontSize: "var(--font-size-lg)",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  EXPOGRAPH
                </div>
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "var(--font-size-lg)",
                    fontWeight: "600",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  Academy
                </span>
              </div>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "1.6",
                  fontFamily: "var(--font-dm)",
                }}
              >
                Empowering developers with cutting-edge coding education and AI-powered tools.
              </p>
            </div>
            <div>
              <h4
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--font-size-base)",
                  fontWeight: "600",
                  marginBottom: "16px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                Courses
              </h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li>
                  <Link
                    to="/courses"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "var(--font-size-sm)",
                      fontFamily: "var(--font-dm)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    Full Stack Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "var(--font-size-sm)",
                      fontFamily: "var(--font-dm)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    Data Science & ML
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "var(--font-size-sm)",
                      fontFamily: "var(--font-dm)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    DevOps & Cloud
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--font-size-base)",
                  fontWeight: "600",
                  marginBottom: "16px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                Resources
              </h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li>
                  <Link
                    to="#"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "var(--font-size-sm)",
                      fontFamily: "var(--font-dm)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "var(--font-size-sm)",
                      fontFamily: "var(--font-dm)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "var(--font-size-sm)",
                      fontFamily: "var(--font-dm)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--font-size-base)",
                  fontWeight: "600",
                  marginBottom: "16px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                Contact
              </h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li>
                  <a
                    href={`mailto:kundrapubhargav@gmail.com`}
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "var(--font-size-sm)",
                      fontFamily: "var(--font-dm)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    <FiMail size={16} />
                    kundrapubhargav@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "var(--font-size-sm)",
                      fontFamily: "var(--font-dm)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    <FiMessageCircle size={16} />
                    WhatsApp Us
                  </a>
                </li>
              </ul>
              <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
                {[
                  { icon: FiLinkedin, href: "#" },
                  { icon: FiTwitter, href: "#" },
                  { icon: FiInstagram, href: "#" },
                  { icon: FiYoutube, href: "#" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "20px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              paddingTop: "40px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "var(--font-size-sm)",
              fontFamily: "var(--font-dm)",
            }}
          >
            © 2024 ExpoGraph Academy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
