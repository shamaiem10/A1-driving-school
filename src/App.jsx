import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const links = [
  ['Home', 'home'], ['Courses', 'courses'], ['Rider Program', 'rider-program'],
  ['Training Centers', 'training-centers'], ['Corporate Training', 'corporate-training'],
  ['Branches', 'branches'], ['FAQs', 'faqs'], ['About', 'about'], ['Blog', 'blog'], ['Contact', 'contact']
];

const courseData = [
  {
    title: 'Theoretical Driving Course (TDC)',
    text: 'Aspiring drivers are now required to attend 15-hour Theoretical Driving Course before applying for student permits.',
    price: 'Starts at Php 1,000',
    image: 'https://a-1driving.com/wp-content/uploads/2025/09/TDC-Classroom-APRIL-2024-v2.jpg',
    icon: 'bi bi-book-half',
    href: 'https://a-1driving.com/product/theoretical-driving-course-classroom-tdc-classroom/'
  },
  {
    title: 'Practical Driving Course (PDC)',
    text: 'Drive any of our 170+ latest training vehicles at scheduled time slots.',
    price: 'Starts at Php 4,000',
    image: 'https://a-1driving.com/wp-content/uploads/2025/02/PDC_2025-1.jpg',
    icon: 'bi bi-car-front-fill',
    href: 'https://a-1driving.com/product/premium-course/'
  },
  {
    title: 'Motorcycle Riding Course (MRC)',
    text: 'Future riders can now learn how to navigate the roads safely.',
    price: 'Starts at Php 2,500',
    image: 'https://a-1driving.com/wp-content/uploads/2017/08/MRC-Classroom-APRIL-2024.jpg',
    icon: 'bi bi-bicycle',
    href: 'https://a-1driving.com/product/motorcycle-practical-riding-course/'
  }
];

const advantages = [
  ['Proven Track Record', 'Over four decades of producing thousands of safe and educated drivers.', 'https://a-1driving.com/wp-content/uploads/2018/05/num01.png', 'bi bi-award'],
  ['Easy Access', 'Over 40 branches nationwide.', 'https://a-1driving.com/wp-content/uploads/2018/05/num02.png', 'bi bi-geo-alt-fill'],
  ['Proper Learning', 'Theoretical classes are conducted in 25 classrooms nationwide before students undergo practical driving lessons.', 'https://a-1driving.com/wp-content/uploads/2018/05/num03.png', 'bi bi-mortarboard-fill'],
  ['Learning Facility', 'Our 6 Training Centers serve as a complete training ground for student drivers, away from the hustle and bustle of city streets.', 'https://a-1driving.com/wp-content/uploads/2018/05/num04.png', 'bi bi-cone-striped'],
  ['Standard Training', 'Our Standard Uniform Instruction Technique ensures students across the nation get the same quality A-1 education.', 'https://a-1driving.com/wp-content/uploads/2018/05/num05.png', 'bi bi-card-checklist'],
  ['Quality Instructors and Trainors', 'Learn from LTO and TESDA certified trainors.', 'https://a-1driving.com/wp-content/uploads/2018/05/num06.png', 'bi bi-people-fill']
];

const branches = [
  ['SM City Sto. Tomas', 'SM City Sto Tomas, Basement Level (in front of the parking entrance and 2GO)', '+63935.314.1593', 'https://a-1driving.com/wp-content/uploads/2023/10/SM-Sto-Tomas-1.jpg'],
  ['Congressional Road, GMA', '23 Lt. Congressional, Gen. M. Alvarez “GMA” (beside Biyaya Polytechnic Academy), Cavite', '+63905.423.7053', 'https://a-1driving.com/wp-content/uploads/2024/07/GMA_2.jpg'],
  ['SM City Bacoor', 'SM City Bacoor, Lower Ground Floor (beside LBC), Cavite', '+63915.098.8201', 'https://a-1driving.com/wp-content/uploads/2026/04/SM-Bacoor.jpg'],
  ['SM City Dasmariñas', 'SM City Dasmariñas, Upper Ground Floor (beside Tropix), Cavite', '+6346.437.9641', 'https://a-1driving.com/wp-content/uploads/2026/04/SM-Dasma.jpg']
];

const faqs = [
  ['How much does your Practical Driving Course (PDC) cost?', 'Our course fees are designed depending on your level of need: Beginner (20-30 Hours), Intermediate (10-15 Hours) or Refresher (8 Hours). Fees starts at P4,000. Visit our Courses page for more info.'],
  ['What is the minimum age to learn how to drive? And what are the requirements?', 'Minimum age is 17 years old. You need a Student Permit to start behind-the-wheel training.'],
  ['What do I need to bring during my practical driving sessions?', 'All students are required to bring their student permit or driver’s license (with LTO O.R.), A-1 ID and O.R. as proof of payment during actual driving lessons. Please wear proper clothing and footwear; sleeveless shirt, short pants, slippers and sandals are strictly not allowed. For security reasons, do not bring firearms, deadly weapons or valuable belongings.']
];

const reveal = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

function SmartImage({ src, alt, className = '', imageClassName = '', hover = true }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={`image-shell ${className}`} whileHover={reduce || !hover ? undefined : { y: -3 }}>
      <motion.img
        className={`real-image ${imageClassName}`}
        src={src}
        alt={alt}
        loading="lazy"
        onError={(event) => { event.currentTarget.style.display = 'none'; }}
        initial={{ opacity: 0, scale: reduce ? 1 : 1.06, clipPath: reduce ? 'none' : 'inset(0 100% 0 0)' }}
        whileInView={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduce ? 0.2 : 0.75, ease: [0.16, 1, 0.3, 1] }}
        whileHover={reduce || !hover ? undefined : { scale: 1.06, rotate: 1 }}
      />
      <div className="image-fallback" aria-hidden="true"><i className="bi bi-shield-check" /></div>
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, text, inverted = false }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`section-heading ${inverted ? 'inverted' : ''}`}
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </motion.div>
  );
}

function Button({ href, children, secondary = false, light = false, icon = 'bi bi-arrow-right' }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      className={`button ${secondary ? 'button-secondary' : ''} ${light ? 'button-light' : ''}`}
      href={href}
      whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <span>{children}</span><i className={icon || 'bi bi-arrow-right'} />
    </motion.a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <motion.header className={`site-header ${scrolled ? 'scrolled' : ''}`} initial={{ opacity: 0, y: reduce ? 0 : -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] }}>
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="A-1 Driving School home"><span>A-1</span><strong>DRIVING SCHOOL</strong></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, id]) => <motion.a key={id} href={`#${id}`} whileHover={reduce ? undefined : { y: -2 }}>{label}</motion.a>)}
        </nav>
        <div className="header-actions">
          <motion.a className="enroll-small" href="#enroll" whileHover={reduce ? undefined : { y: -2, scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.97 }}>Enroll</motion.a>
          <motion.a className="cart-button" href="https://a-1driving.com/cart/" aria-label="Cart, 0 items" whileHover={reduce ? undefined : { scale: 1.05, rotate: -3 }}><i className="bi bi-cart3" /><span>0</span></motion.a>
          <button className={`menu-button ${open ? 'active' : ''}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation"><span /><span /><span /></button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, x: reduce ? 0 : '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduce ? 0 : '100%' }} transition={{ duration: reduce ? 0.2 : 0.38, ease: [0.16, 1, 0.3, 1] }}>
            {links.map(([label, id], index) => <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: reduce ? 0 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduce ? 0 : index * 0.03 }}>{label}<i className="bi bi-chevron-right" /></motion.a>)}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const carX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -20]);
  const laneX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -12]);
  const words = ['Your', 'road', 'to', 'safe,', 'confident', 'driving.'];
  return (
    <section id="home" className="hero" ref={ref}>
      <motion.div className="hero-lanes" style={{ x: laneX }} aria-hidden="true"><span /><span /><span /><span /><span /><span /></motion.div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <motion.div className="hero-copy" style={{ y: copyY }}>
          <motion.div className="hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}><i className="bi bi-shield-check" /> Road safety starts here</motion.div>
          <h1>{words.map((word, index) => <motion.span key={`${word}-${index}`} initial={{ opacity: 0, y: reduce ? 0 : 18, filter: reduce ? 'none' : 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : 0.12 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}>{word} </motion.span>)}</h1>
          <motion.p initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : 0.2, duration: 0.5 }}>Choose from a variety of vehicles, schedule and instructors that fits your needs.</motion.p>
          <motion.div className="hero-hud" initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }} animate={{ opacity: 1, scale: 1 }} whileHover={reduce ? undefined : { y: -3 }} transition={{ duration: reduce ? 0.2 : 0.5 }}>
            <Button href="#enroll" icon="bi bi-lightning-charge-fill">Enroll Today</Button>
            <Button href="#courses" secondary icon="bi bi-geo-alt-fill">Browse Courses</Button>
          </motion.div>
          <div className="direction-note"><span>Choose</span><i className="bi bi-chevron-right" /><span>Learn</span><i className="bi bi-chevron-right" /><span>Drive</span></div>
        </motion.div>
        <motion.div className="hero-car-wrap" style={{ x: carX }} initial={{ opacity: 0, x: reduce ? 0 : 40, y: reduce ? 0 : 8, scale: reduce ? 1 : 0.98 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} transition={reduce ? { duration: 0.2 } : { type: 'spring', stiffness: 110, damping: 18, mass: 0.9 }} whileHover={reduce ? undefined : { scale: 1.015 }}>
          <SmartImage src="https://a-1driving.com/wp-content/uploads/2022/02/ALTIS-2014-side-view-right-ROAD-SAFETY-STARTS.png" alt="A-1 Driving School training car" className="hero-car" imageClassName="car-png" />
        </motion.div>
      </div>
    </section>
  );
}

function Paths() {
  const reduce = useReducedMotion();
  const paths = [
    ['Student Driver', 'Safety begins with proper education.', 'bi bi-steering-wheel', 'https://a-1driving.com/shop/drivers-education-101/'],
    ['Rider', 'Designed to formally educate the growing rider population of our country.', 'bi bi-bicycle', '#rider-program'],
    ['Corporate Fleets', 'Highly effective training courses designed for corporate fleets, bus and truck companies.', 'bi bi-building', '#corporate-training']
  ];
  return (
    <section className="section paths-section">
      <div className="mesh mesh-yellow" aria-hidden="true" />
      <div className="container narrow">
        <SectionHeading eyebrow="Pick your path" title="Training built around your journey" text="Clear learning paths for student drivers, riders and professional fleets." />
        <div className="path-tabs"><span>Student</span><span>Rider</span><span>Corporate</span></div>
        <div className="card-grid three">
          {paths.map(([title, text, icon, href], index) => (
            <motion.article className="path-card pointer-surface" key={title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : index * 0.09 }} whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}>
              <SmartImage src="https://a-1driving.com/wp-content/uploads/2025/02/PDC_2025-1.jpg" alt="A-1 practical driving course" className={`path-image crop-${index + 1}`} />
              <div className="card-body"><motion.div className="icon-box" whileHover={reduce ? undefined : { rotate: -5, scale: 1.1 }}><i className={icon || 'bi bi-steering-wheel'} /></motion.div><h3>{title}</h3><p>{text}</p><motion.a href={href} className="text-link" whileHover={reduce ? undefined : { x: 5 }}>Learn More <i className="bi bi-arrow-right" /></motion.a></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningLane() {
  const reduce = useReducedMotion();
  const steps = ['Choose Course', 'Register', 'Pay', 'Attend 15-hr TDC', 'Book PDC', 'Practice at Training Center'];
  return (
    <section className="section lane-section">
      <div className="container journey-container">
        <SectionHeading eyebrow="The learning lane" title="Your A-to-Z journey" text="A clear route makes getting started feel simple." inverted />
        <div className="journey-track">
          {steps.map((step, index) => <motion.article className="step-card" key={step} initial={{ opacity: 0, x: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : index * 0.07 }} whileHover={reduce ? undefined : { y: -6 }}><span>{index + 1}</span><i className={index === 0 ? 'bi bi-flag' : 'bi bi-traffic-cone'} /><h3>{step}</h3></motion.article>)}
          <motion.div className="traffic-end" initial={{ opacity: 0, scale: reduce ? 1 : 0.85, rotate: reduce ? 0 : -6 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} whileHover={reduce ? undefined : { scale: 1.06 }}>
            <SmartImage src="https://a-1driving.com/wp-content/uploads/2019/06/Traffic-light-123-v2.gif" alt="Traffic light showing the enrollment journey" className="traffic-image" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.article className="course-card pointer-surface" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0.2 : 0.58, delay: reduce ? 0 : index * 0.085 }} whileHover={reduce ? undefined : { y: -8 }}>
      <SmartImage src={course.image} alt={course.title} className="course-image" />
      <div className="course-content"><div className="course-icon"><i className={course.icon || 'bi bi-book-half'} /></div><h3>{course.title}</h3><p>{course.text}</p><div className="course-meta"><span>Course</span><strong>{course.price}</strong></div><Button href={course.href}>View Course</Button></div>
    </motion.article>
  );
}

function FeaturedCourses() {
  return (
    <section id="courses" className="section courses-section">
      <div className="container narrow">
        <SectionHeading eyebrow="Featured courses & services" title="Choose the right course for you" text="Choose from a variety of vehicles, schedule and instructors that fits your needs." />
        <div className="card-grid three">{courseData.map((course, index) => <CourseCard course={course} index={index} key={course.title} />)}</div>
        <div className="center-action"><Button href="https://a-1driving.com/courses/" secondary>Browse All Courses</Button></div>
      </div>
    </section>
  );
}

function Advantage({ deep = false }) {
  const reduce = useReducedMotion();
  return (
    <section id={deep ? 'about' : undefined} className={`section advantage-section ${deep ? 'deep-advantage' : ''}`}>
      <div className="container narrow advantage-layout">
        <div>
          <SectionHeading eyebrow={deep ? 'About A-1' : 'The A-1 advantage'} title={deep ? 'A deeper commitment to safe driving' : 'A track record built on safer drivers'} text="Our track record of producing safe drivers helps make us the country’s premiere driving school." />
          {!deep ? <Button href="https://a-1driving.com/about/the-a-1-advantage/" secondary>Learn More</Button> : null}
        </div>
        <div className="advantage-grid">
          {advantages.map(([title, text, image, icon], index) => (
            <motion.article className="advantage-card pointer-surface" key={title} tabIndex="0" initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reduce ? 0.2 : 0.55, delay: reduce ? 0 : index * 0.07 }} whileHover={reduce ? undefined : { y: -6, scale: 1.015 }}>
              <div className="advantage-top"><SmartImage src={image} alt={`Number ${index + 1}`} className="number-image" hover={false} /><span className="advantage-icon"><i className={icon || 'bi bi-shield-check'} /></span></div><h3>{title}</h3><p>{text}</p>
            </motion.article>
          ))}
        </div>
        {deep ? <div className="legacy-mark"><SmartImage src="https://a-1driving.com/wp-content/uploads/2026/03/49-Years-logo-300x296.png" alt="49 Years of A-1 Driving School" className="legacy-image" /></div> : null}
      </div>
    </section>
  );
}

function BranchFinder() {
  return (
    <section className="section branch-finder">
      <SmartImage src="https://a-1driving.com/wp-content/uploads/2017/07/branch-finder.jpg" alt="A-1 branch finder" className="branch-backdrop" hover={false} />
      <div className="branch-overlay" />
      <div className="container finder-content">
        <SectionHeading eyebrow="Nationwide access" title="Find a branch near you" text="Need help in locating a branch? Inquire Monday – Saturday, 8:00am – 6:00pm." inverted />
        <motion.div className="search-panel pointer-surface" initial="hidden" whileInView="visible" variants={reveal} viewport={{ once: true, amount: 0.2 }}><label htmlFor="branch-search"><i className="bi bi-search" /> Search for a nearby branch</label><div className="search-row"><input id="branch-search" type="search" placeholder="Enter a city or branch" /><Button href="#branches" icon="bi bi-geo-alt">Browse Our Branches</Button></div><div className="phone-list"><a href="tel:+63285322272">+63.2.8532.2272</a><a href="tel:+639423827688">+63.942.382.7688</a><a href="tel:+639062760011">+63.906.276.0011</a></div></motion.div>
      </div>
    </section>
  );
}

function CoursesFilter() {
  const [active, setActive] = useState('All Courses');
  const reduce = useReducedMotion();
  const chips = ['All Courses', 'TDC', 'PDC', 'MRC'];
  return (
    <section className="section courses-filter">
      <div className="container compact split-layout">
        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span className="eyebrow">Courses</span><h2>Find your next step</h2><p>Aspiring drivers are required to attend a 15-hour Theoretical Driving Course before applying for student permits. Practical Driving Course schedules are available for hands-on training.</p><div className="filter-bar"><i className="bi bi-sliders" />{chips.map((chip, index) => <motion.button key={chip} className={active === chip ? 'active' : ''} onClick={() => setActive(chip)} initial={{ opacity: 0, x: reduce ? 0 : -18 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: reduce ? 0 : index * 0.045 }} whileHover={reduce ? undefined : { y: -3 }}>{active === chip ? <i className="bi bi-check2-circle" /> : <i className="bi bi-circle" />}{chip}</motion.button>)}</div></motion.div>
        <SmartImage src="https://a-1driving.com/wp-content/uploads/2025/02/PDC_2025-1.jpg" alt="Practical Driving Course training" className="split-image" />
      </div>
    </section>
  );
}

function CoursesGrid() {
  return (
    <section className="section courses-grid-section">
      <div className="container narrow"><SectionHeading eyebrow="Courses grid" title="Browse through our courses" /><div className="card-grid three">{courseData.map((course, index) => <CourseCard course={{ ...course, image: 'https://a-1driving.com/wp-content/uploads/2017/08/MRC-Classroom-APRIL-2024.jpg', icon: index === 0 ? 'bi bi-journal-text' : 'bi bi-speedometer2' }} index={index} key={`grid-${course.title}`} />)}</div></div>
    </section>
  );
}

function ProgramSplit({ id, eyebrow, title, text, image, imageAlt, icon, bullets, button, href, reverse = false }) {
  const reduce = useReducedMotion();
  return (
    <section id={id} className={`section program-section ${reverse ? 'reverse' : ''}`}>
      <div className="container compact program-grid">
        <motion.div className="program-copy" initial={{ opacity: 0, x: reduce ? 0 : -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0.2 : 0.6 }}><span className="eyebrow"><i className={icon || 'bi bi-shield-check'} /> {eyebrow}</span><h2>{title}</h2><p>{text}</p><div className="benefit-list">{bullets.map((bullet, index) => <motion.div key={bullet} initial={{ opacity: 0, x: reduce ? 0 : -14 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: reduce ? 0 : index * 0.055 }}><i className="bi bi-check2-circle" /><span>{bullet}</span></motion.div>)}</div><Button href={href}>{button}</Button></motion.div>
        <motion.div initial={{ opacity: 0, x: reduce ? 0 : 28, scale: reduce ? 1 : 0.98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0.2 : 0.65 }}><SmartImage src={image} alt={imageAlt} className="program-image" /></motion.div>
      </div>
    </section>
  );
}

function Branches() {
  const reduce = useReducedMotion();
  return (
    <>
      <section id="branches" className="section branches-hero">
        <SmartImage src="https://a-1driving.com/wp-content/uploads/2017/07/branch-finder.jpg" alt="Find an A-1 Driving School branch" className="branches-hero-image" hover={false} />
        <div className="branch-overlay" />
        <div className="container branches-hero-content"><SectionHeading eyebrow="Branches" title="Enrolling is more convenient nationwide" text="Start with action—find your nearest branch." inverted /><div className="regional-pills"><span><i className="bi bi-compass" /> Search branches</span><span><i className="bi bi-map" /> Browse locations</span></div></div>
      </section>
      <section className="section branch-gallery">
        <div className="container"><SectionHeading eyebrow="Branch gallery" title="Physical locations, made easy to scan" /><div className="card-grid four">{branches.map(([name, address, phone, image], index) => <motion.article className="branch-card" key={name} initial={{ opacity: 0, y: reduce ? 0 : 28, scale: reduce ? 1 : 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduce ? 0.2 : 0.55, delay: reduce ? 0 : index * 0.065 }} whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}><SmartImage src={image} alt={name} className="branch-card-image" /><div className="branch-card-body"><h3>{name}</h3><p><i className="bi bi-pin-map-fill" /> {address}</p><motion.a href={`tel:${phone.replaceAll('.', '')}`} whileHover={reduce ? undefined : { y: -2 }}><i className="bi bi-telephone-fill" /> {phone}</motion.a></div></motion.article>)}</div></div>
      </section>
    </>
  );
}

function AccordionItem({ question, answer, index }) {
  const [open, setOpen] = useState(index === 0);
  const reduce = useReducedMotion();
  return (
    <motion.article className={`faq-item ${open ? 'open' : ''}`} initial={{ opacity: 0, y: reduce ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0.2 : 0.48, delay: reduce ? 0 : index * 0.055 }}>
      <button onClick={() => setOpen((value) => !value)} aria-expanded={open}><span><i className="bi bi-question-circle" />{question}</span><motion.i className="bi bi-plus-lg" animate={{ rotate: reduce ? 0 : open ? 45 : 0 }} /></button>
      <AnimatePresence initial={false}>{open ? <motion.div className="faq-answer" initial={{ opacity: 0, y: reduce ? 0 : -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduce ? 0.15 : 0.3 }}><p>{answer}</p></motion.div> : null}</AnimatePresence>
    </motion.article>
  );
}

function FAQs({ full = false }) {
  return (
    <section id={full ? 'faqs' : undefined} className={`section faq-section ${full ? 'full-faq' : ''}`}>
      <div className="container faq-container">
        <SectionHeading eyebrow={full ? 'Full FAQs' : 'Frequently asked questions'} title={full ? 'Answers for the road ahead' : 'Quick answers before you enroll'} text="Our courses and services are backed by four decades of experience." />
        <div className={full ? 'full-faq-layout' : ''}>
          {full ? <aside className="quick-links"><strong>Quick links</strong>{faqs.map(([question], index) => <a href={`#faq-${index + 1}`} key={question}>{index + 1}. {question}</a>)}</aside> : null}
          <div className="faq-list">{faqs.map(([question, answer], index) => <div id={`faq-${index + 1}`} key={question}><AccordionItem question={question} answer={answer} index={index} /></div>)}</div>
        </div>
        {!full ? <Button href="#faqs" secondary>View All FAQs</Button> : <Button href="#courses" secondary>View Related Courses</Button>}
      </div>
    </section>
  );
}

function EnrollCTA() {
  const reduce = useReducedMotion();
  return (
    <section id="enroll" className="section enroll-section"><motion.div className="container enroll-band pointer-surface" initial={{ opacity: 0, y: reduce ? 0 : 48, scale: reduce ? 1 : 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduce ? 0.2 : 0.65, ease: [0.16, 1, 0.3, 1] }} whileHover={reduce ? undefined : { y: -4 }}><div><span className="eyebrow light-eyebrow">Safety starts here</span><h2>Enrolling is easy.</h2><p>Choose your course, register and pay your fees.</p><div className="cta-actions"><Button href="https://a-1driving.com/courses/" light>Enroll Today</Button><Button href="#courses" secondary light>Browse Courses</Button></div></div><SmartImage src="https://a-1driving.com/wp-content/uploads/2019/06/Traffic-light-123-v2.gif" alt="Traffic light" className="cta-traffic" /></motion.div></section>
  );
}

function Contact() {
  const reduce = useReducedMotion();
  const cards = [
    ['Call A-1', '+632.532.2272', 'tel:+6325322272', 'bi bi-telephone'],
    ['Email A-1', 'info@a-1driving.com', 'mailto:info@a-1driving.com', 'bi bi-envelope-fill'],
    ['Branch assistance', 'Monday – Saturday, 8:00am – 6:00pm', '#branches', 'bi bi-clock-fill']
  ];
  return (
    <section id="contact" className="section contact-section"><div className="container compact"><SectionHeading eyebrow="Contact & hours" title="How can we help?" /><div className="card-grid three">{cards.map(([title, value, href, icon], index) => <motion.article className="contact-card pointer-surface" key={title} initial={{ opacity: 0, y: reduce ? 0 : 26, scale: reduce ? 1 : 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0.2 : 0.52, delay: reduce ? 0 : index * 0.07 }} whileHover={reduce ? undefined : { y: -7, scale: 1.015 }}><i className={icon || 'bi bi-info-circle'} /><h3>{title}</h3><p>{value}</p><motion.a href={href} whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}>Contact <i className="bi bi-arrow-right" /></motion.a></motion.article>)}</div></div></section>
  );
}

function Footer() {
  return (
    <footer id="blog" className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#home"><span>A-1</span><strong>DRIVING SCHOOL</strong></a><p>Road safety starts with proper education.</p></div><div><h3>Recent Posts</h3><a href="https://a-1driving.com/shell-philippines-partnership-continues/">A-1 Launches New Rider Program</a><a href="https://a-1driving.com/mommy-set-go/">Shell Philippines Partnership Continues</a><a href="https://a-1driving.com/women-on-wheels/">Women On Wheels! (WOW)</a></div><div><h3>Connect</h3><a href="https://www.facebook.com/A1DrivingSchoolPH/"><i className="bi bi-facebook" /> Facebook</a><a href="https://www.instagram.com/a1drivingph"><i className="bi bi-instagram" /> Instagram</a><a href="mailto:info@a-1driving.com">info@a-1driving.com</a></div></div></footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Paths />
        <LearningLane />
        <FeaturedCourses />
        <Advantage />
        <BranchFinder />
        <FAQs />
        <EnrollCTA />
        <CoursesFilter />
        <CoursesGrid />
        <Branches />
        <ProgramSplit id="training-centers" eyebrow="Training centers" title="Learn in a safe and controlled environment" text="A-1 Driving’s pioneering Training Centers are complete training grounds for student drivers away from the busy streets of the city." image="https://a-1driving.com/wp-content/uploads/2017/07/branch-finder.jpg" imageAlt="A-1 training center environment" icon="bi bi-cone-striped" bullets={['Complete training grounds', 'Away from busy city streets']} button="View Training Center Offerings" href="https://a-1driving.com/shop/training-center-course/" />
        <ProgramSplit id="corporate-training" eyebrow="Corporate training" title="Fleet drivers training & assessment" text="We have highly effective training courses designed for corporate fleets, bus and truck companies." image="https://a-1driving.com/wp-content/uploads/2025/02/PDC_2025-1.jpg" imageAlt="Fleet driver practical training" icon="bi bi-building" bullets={['Corporate fleets', 'Bus and truck companies']} button="Learn More" href="https://a-1driving.com/shop/fleet-drivers-training-assessment/" reverse />
        <ProgramSplit id="rider-program" eyebrow="Rider program" title="Safety for all: training program for riders" text="Designed to formally educate the growing rider population of our country." image="https://a-1driving.com/wp-content/uploads/2017/08/MRC-Classroom-APRIL-2024.jpg" imageAlt="Motorcycle riding course classroom" icon="bi bi-bicycle" bullets={['Formal rider education', 'Navigate roads safely']} button="Enroll in the Rider Program" href="https://a-1driving.com/product/motorcycle-practical-riding-course/" />
        <FAQs full />
        <Advantage deep />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
