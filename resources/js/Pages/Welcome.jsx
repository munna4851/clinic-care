import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);

    const doctors = [
        {
            name: "Prof. Dr. Md. Mehdi Ul Alam",
            title: "BDS, DDS, FCPS (Oral & Maxillofacial Surgery), Professor & Head, Dept. of Oral & Maxillofacial Surgery (Ex), Dhaka Dental College.",
            img: "/images/mehdih.png"
        },
        {
            name: "Dr. Md. Mahfuzul Islam",
            title: "BDS, DDS, FCPS (Oral & Maxillofacial Surgery), Assistant Professor, Dept. of Oral & Maxillofacial Surgery, Dhaka Dental College.",
            img: "/images/mahfuz.png"
        },
        {
            name: "Dr. Md. Mozammel Haque",
            title: "BDS, DDS, FCPS (Oral & Maxillofacial Surgery), Professor & Head, Dept. of Oral & Maxillofacial Surgery, Dhaka Dental College.",
            img: "/images/iqbal.png"
        },
        {
            name: "Dr. Md. Ali Asgor Moral",
            title: "BDS, MS, PhD, FCPS (Oral & Maxillofacial Surgery), Professor & Head, Dept. of Oral & Maxillofacial Surgery, Dhaka Dental College.",
            img: "/images/awal.png"
        },
        {
            name: "Dr. Ishrat Mahfuz",
            title: "BDS, DDS (Orthodontics & Dentofacial Orthopedics), Assistant Professor, Dhaka Community Medical College & Hospital.",
            img: "/images/ishrat.png"
        },
        {
            name: "Dr. Chowdhury Afsana Parvin",
            title: "BDS, DDS (Oral & Maxillofacial Surgery), Assistant Professor, Dept. of Oral & Maxillofacial Surgery, Dhaka Medical College.",
            img: "/images/parvin.png"
        },
        {
            name: "Lt. Col. Dr. Aminul Islam",
            title: "MBBS, BDS, FCPS (Oral & Maxillofacial Surgery), Classified Oral & Maxillofacial Surgeon, Combined Military Hospital (CMH), Dhaka.",
            img: "/images/aminul.png"
        }
    ];

    return (
        <>
            <Head title="Dhanmondi Dental Center — Dental Chamber" />
            
            <style>{`
                :root {
                    --bg: #FAFAF7;
                    --ink: #1A1A18;
                    --teal: #0E3A35;
                    --teal-2: #145C53;
                    --green: #1F8A70;
                    --green-l: #E4F3EE;
                    --sand-2: #F1ECE0;
                    --terracotta: #C75D3D;
                    --line: rgba(14,58,53,0.12);
                    --shadow: 0 1px 2px rgba(14,58,53,0.04), 0 8px 24px rgba(14,58,53,0.06);
                }

                .bright-smile-body {
                    background: var(--bg);
                    color: var(--ink);
                    font-family: 'Inter', sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                .wrap { 
                    max-width: 1400px; 
                    margin: 0 auto; 
                    padding: 0 40px; 
                }

                /* ---------- Topbar (Full Width, Logo Left, Nav Center, Actions Right) ---------- */
                .topbar {
                    position: sticky; top: 0; z-index: 50;
                    background: rgba(250,250,247,0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid var(--line);
                    width: 100%;
                }
                .topbar-inner {
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between;
                    height: 72px;
                    width: 100%;
                    padding: 0 40px; 
                    box-sizing: border-box;
                }
                
                /* Left Side: Logo */
                .topbar-left {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }
                .brand { display: flex; align-items: center; }
                .brand img { height: 45px; width: auto; display: block; }

                /* Center Side: Nav Links (Bold & Centered) */
                .topbar-center {
                    display: flex;
                    flex: 1;
                    justify-content: center;
                }
                .nav-links { display: flex; align-items: center; gap: 40px; }
                .nav-links a { 
                    font-size: 15px; 
                    font-weight: 700; /* 👈 বোল্ড করা হয়েছে */
                    color: var(--ink); 
                    opacity: 0.9; 
                    transition: opacity .15s, color .15s; 
                    text-decoration: none; 
                }
                .nav-links a:hover { opacity: 1; color: var(--green); }

                /* Right Side: Actions */
                .topbar-actions { 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    position: relative; 
                    flex-shrink: 0;
                }

                .btn {
                    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
                    font-size: 14.5px; font-weight: 600; padding: 10px 20px; border-radius: 9px;
                    border: 1px solid transparent; cursor: pointer; text-decoration: none;
                    transition: transform .15s, background .15s, border-color .15s, box-shadow .15s;
                    white-space: nowrap;
                }
                .btn-ghost { background: transparent; color: var(--teal); border-color: var(--line); }
                .btn-ghost:hover { background: var(--sand-2); }
                .btn-solid { background: var(--teal); color: #fff; }
                .btn-solid:hover { background: var(--teal-2); transform: translateY(-1px); box-shadow: var(--shadow); }
                .btn-lg { padding: 14px 26px; font-size: 15.5px; border-radius: 10px; }

                /* ---------- Log in Dropdown ---------- */
                .login-dropdown-wrapper { position: relative; }
                .login-dropdown-menu {
                    position: absolute;
                    top: calc(100% + 10px);
                    right: 0;
                    background: #ffffff;
                    border: 1px solid var(--line);
                    border-radius: 12px;
                    box-shadow: 0 12px 32px rgba(14,58,53,0.12);
                    min-width: 200px;
                    padding: 8px;
                    z-index: 100;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .login-dropdown-menu a {
                    display: block;
                    padding: 10px 16px;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--ink);
                    text-decoration: none;
                    border-radius: 8px;
                    transition: background 0.15s ease, color 0.15s ease;
                }
                .login-dropdown-menu a:hover {
                    background: var(--green-l);
                    color: var(--teal);
                }

                /* ---------- Hero ---------- */
                .hero { position: relative; padding: 80px 0; overflow: hidden; }
                .hero::before {
                    content: ''; position: absolute; top: -180px; right: -180px;
                    width: 520px; height: 520px; border-radius: 50%;
                    background: radial-gradient(circle, var(--green-l) 0%, transparent 72%);
                    z-index: 0;
                }
                .hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

                .hero h1 { font-family: 'Fraunces', serif; font-size: 42px; color: var(--teal); margin-bottom: 24px; font-weight: 600; line-height: 1.1; }
                .hero p.story-text { font-size: 15px; line-height: 1.7; color: rgba(26,26,24,0.68); margin-bottom: 16px; }
                .hero p.story-text:last-of-type { margin-bottom: 28px; }
                
                .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

                .hero-image {
                    position: relative; z-index: 1; width: 100%;
                    border-radius: 20px; overflow: hidden;
                    box-shadow: 0 24px 60px -12px rgba(14,58,53,0.25);
                    border: 1px solid var(--line); background: #fff;
                    display: flex; align-items: center; justify-content: center;
                    min-height: 400px;
                }
                .hero-image img { width: 100%; height: auto; display: block; object-fit: cover; }

                /* ---------- Services Section ---------- */
                .services-section { padding: 80px 0; background: #fff; border-top: 1px solid var(--line); }
                .services-grid-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: flex-start; }
                
                .services-content h2 { font-family: 'Fraunces', serif; font-size: 36px; color: var(--teal); margin-bottom: 12px; font-weight: 600; }
                .services-content h3 { font-size: 18px; color: var(--green); font-weight: 600; margin-bottom: 16px; margin-top: 0; }
                .services-content p { font-size: 15px; color: rgba(26,26,24,0.68); line-height: 1.7; margin-bottom: 24px; }
                
                .service-list {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px 24px;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .service-list li {
                    position: relative;
                    padding-left: 20px;
                    font-size: 15px;
                    color: var(--ink);
                    font-weight: 500;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }
                .service-list li:hover { color: var(--green); }
                .service-list li::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 9px;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--green);
                }

                /* ---------- Team / Doctors Section ---------- */
                .team-section { padding: 80px 0; background: var(--bg); border-top: 1px solid var(--line); }
                .team-grid { 
                    display: grid; 
                    grid-template-columns: repeat(4, 1fr); 
                    gap: 24px; 
                    margin-top: 40px;
                }
                .team-card { 
                    position: relative; 
                    border-radius: 16px; 
                    overflow: hidden; 
                    height: 380px; 
                    box-shadow: 0 4px 18px rgba(20, 40, 60, .07);
                    transition: transform .3s ease, box-shadow .3s ease;
                    background: #fff;
                }
                .team-card:hover { transform: translateY(-6px); box-shadow: 0 16px 34px rgba(20, 40, 60, .14); }
                .team-card img { width: 100%; height: 100%; object-fit: cover; }
                .team-overlay { 
                    position: absolute; 
                    bottom: 0; left: 0; right: 0; 
                    padding: 24px 20px 20px; 
                    background: linear-gradient(to top, rgba(14,58,53,0.95) 0%, rgba(14,58,53,0.7) 50%, transparent 100%); 
                    color: #fff; 
                    display: flex; 
                    flex-direction: column; 
                    justify-content: flex-end; 
                }
                .team-overlay h3 { font-size: 15px; font-weight: 600; margin-bottom: 6px; color: #fff; line-height: 1.3; }
                .team-overlay p { font-size: 11.5px; color: rgba(255,255,255,0.85); line-height: 1.5; margin-bottom: 16px; }
                .btn-read-more { 
                    background: #fff; 
                    color: var(--teal); 
                    font-size: 11px; 
                    font-weight: 700; 
                    letter-spacing: 1px; 
                    text-transform: uppercase; 
                    padding: 8px 18px; 
                    border-radius: 50px; 
                    border: none; 
                    cursor: pointer; 
                    align-self: flex-start; 
                    transition: background 0.2s ease; 
                    text-decoration: none;
                }
                .btn-read-more:hover { background: #E4F3EE; }

                /* ---------- CTA & Footer ---------- */
                .cta-band { text-align: center; padding: 80px 0; background: #fff; border-top: 1px solid var(--line); }
                .cta-band h2 { font-family: 'Fraunces', serif; font-size: 34px; color: var(--teal); margin-bottom: 14px; font-weight: 600; }
                .cta-band p { font-size: 15.5px; color: rgba(26,26,24,0.6); max-width: 480px; margin: 0 auto 30px; line-height: 1.6; }
                
                footer { background: #fff; border-top: 1px solid var(--line); padding: 56px 0 32px; }
                .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 40px; margin-bottom: 40px; }
                .footer-brand p { font-size: 13.5px; color: rgba(26,26,24,0.55); margin-top: 12px; max-width: 280px; line-height: 1.6; }
                .footer-col h4 { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: rgba(26,26,24,0.45); margin-bottom: 14px; }
                .footer-col a { display: block; font-size: 13.5px; color: rgba(26,26,24,0.7); margin-bottom: 10px; text-decoration: none; transition: color 0.2s ease; }
                .footer-col a:hover { color: var(--green); }
                .footer-contact-info p { font-size: 13.5px; color: rgba(26,26,24,0.7); line-height: 1.6; margin-bottom: 8px; }
                .footer-contact-info a { color: rgba(26,26,24,0.7); text-decoration: none; }
                .footer-contact-info a:hover { color: var(--green); }
                .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 28px; border-top: 1px solid var(--line); font-size: 12.5px; color: rgba(26,26,24,0.45); }

                /* ---------- Section Head ---------- */
                .section-head { max-width: 600px; margin-bottom: 48px; }
                .section-eyebrow { font-size: 12.5px; font-weight: 700; color: var(--green); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; display: block; }
                .section-head h2 { font-family: 'Fraunces', serif; font-size: 36px; color: var(--teal); margin-bottom: 12px; font-weight: 600; }
                .section-head p { font-size: 15.5px; color: rgba(26,26,24,0.6); line-height: 1.6; }

                /* ---------- Responsive ---------- */
                @media (max-width: 1200px) {
                    .topbar-inner { padding: 0 28px; }
                    .team-grid { grid-template-columns: repeat(3, 1fr); }
                    .footer-grid { grid-template-columns: 1fr 1fr 1fr; }
                }
                @media (max-width: 1024px) {
                    .team-grid { grid-template-columns: repeat(2, 1fr); }
                    .footer-grid { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 920px) {
                    .topbar-center { display: none; } /* Hide nav links on mobile */
                    .hero-grid { grid-template-columns: 1fr; gap: 40px; }
                    .hero h1 { font-size: 32px; }
                    .services-grid-layout { grid-template-columns: 1fr; gap: 40px; }
                }
                @media (max-width: 560px) {
                    .team-grid { grid-template-columns: 1fr; }
                    .services-grid-layout, .footer-grid { grid-template-columns: 1fr; }
                    .service-list { grid-template-columns: 1fr; }
                    .hero h1 { font-size: 28px; }
                    .hero-ctas { flex-direction: column; }
                    .hero-ctas .btn { width: 100%; }
                    .brand img { height: 32px; }
                    .topbar-inner { padding: 0 16px; }
                }
            `}</style>

            <div className="bright-smile-body">
                
                {/* ============ TOPBAR (Full Width, Logo Left, Nav Center, Actions Right) ============ */}
                <header className="topbar">
                    <div className="topbar-inner">
                        
                        {/* Left Side: Logo */}
                        <div className="topbar-left">
                            <div className="brand">
                                <img src="/images/logo.png" alt="Dhanmondi Dental Center" />
                            </div>
                        </div>

                        {/* Center Side: Navigation Links (Bold) */}
                        <div className="topbar-center">
                            <nav className="nav-links">
                                <a href="#services">Services</a>
                                <a href="#doctors">Doctors</a>
                            </nav>
                        </div>

                        {/* Right Side: Log in Dropdown + Get a Serial Button */}
                        <div className="topbar-actions">
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="btn btn-solid">Dashboard</Link>
                            ) : (
                                <>
                                    <div className="login-dropdown-wrapper">
                                        <button 
                                            className="btn btn-ghost" 
                                            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                                        >
                                            Log in
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                                <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>

                                        {showLoginDropdown && (
                                            <div className="login-dropdown-menu">
                                                <Link href="/book-serial" onClick={() => setShowLoginDropdown(false)}>Patient Login</Link>
                                                <Link href={route('login', { type: 'doctor' })} onClick={() => setShowLoginDropdown(false)}>Doctor Login</Link>
                                                <Link href={route('login', { type: 'staff' })} onClick={() => setShowLoginDropdown(false)}>Staff Login</Link>
                                                <Link href={route('login', { type: 'admin' })} onClick={() => setShowLoginDropdown(false)}>Admin Login</Link>
                                            </div>
                                        )}
                                    </div>

                                    <Link href="/book-serial" className="btn btn-solid">Get a Serial</Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* ============ HERO ============ */}
                <section className="hero">
                    <div className="wrap hero-grid">
                        <div>
                            <h1>Our Glorious Story</h1>
                            <p className="story-text">
                                Dhanmondi Dental Center is a well-known name in Dental and Oral Care in Bangladesh. The journey of this institution started in 1977 under the hands of Dr. Kazi Mehdi Ul Alam, Gold Medalist of Dhaka University. Dhanmondi Dental Center has been leading the way in Dental Treatment in Bangladesh for more than 40 years in keeping with the evolution of time and the modernization of the era.
                            </p>
                            <p className="story-text">
                                With the passage of time, dentistry has expanded and there have been availability of specialist doctors in various departments. Currently in each department of this center like Dental Implants, Orthodontic Treatment, Cosmetic Dentistry, Oral & Maxillofacial Surgery, Root Canal, Crown, Bridges, Prosthesis, Filling, Periodontology, specialist doctors with degrees from home and abroad and highly trained in abroad provide treatment to patients in this center. We have long experience of serving domestic and foreign patients.
                            </p>
                            <div className="hero-ctas">
                                <Link href="/book-serial" className="btn btn-solid btn-lg">
                                    Book your serial
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </Link>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img src="/images/banner.png" alt="Dhanmondi Dental Center Team" />
                        </div>
                    </div>
                </section>

                {/* ============ SERVICES ============ */}
                <section className="services-section" id="services">
                    <div className="wrap">
                        <div className="services-grid-layout">
                            <div className="hero-image" style={{ minHeight: 'auto' }}>
                                <img src="/images/work.png" alt="Our Work" />
                            </div>
                            <div className="services-content">
                                <h2>Our Services</h2>
                                <h3>We are specialized in</h3>
                                <p>With more than 48+ years of experience, Our expertise has been spread out in most of the branches of dentistry. With sophisticated technology our expert team is handling many difficult cases successfully. We are offering the services listed below. Follow the links for the details.</p>
                                <ul className="service-list">
                                    <li>Dental Implant</li>
                                    <li>Orthodontic Treatment</li>
                                    <li>Cosmetic Dentistry</li>
                                    <li>Endodontic Treatment</li>
                                    <li>Oral &amp; Maxillofacial Surgery</li>
                                    <li>Periodontal / Gum Treatment</li>
                                    <li>Pediatric &amp; Children Dentistry</li>
                                    <li>Laser Dentistry</li>
                                    <li>Geriatric Dentistry</li>
                                    <li>Autism and Special Patient Dentistry</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ TEAM / DOCTORS ============ */}
                <section className="team-section" id="doctors">
                    <div className="wrap">
                        <div className="section-head">
                            <span className="section-eyebrow">TEAM MEMBERS</span>
                            <h2>Professional Specialists</h2>
                            <p>Every doctor runs their own queue — choose the doctor you'd like to see.</p>
                        </div>
                        <div className="team-grid">
                            {doctors.map((doc, index) => (
                                <div className="team-card" key={index}>
                                    <img src={doc.img} alt={doc.name} />
                                    <div className="team-overlay">
                                        <h3>{doc.name}</h3>
                                        <p>{doc.title}</p>
                                        <a href="#" className="btn-read-more">Read More</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ CTA (Appoint Doctor) ============ */}
                <section className="cta-band">
                    <div className="wrap">
                        <h2>Appoint Doctor</h2>
                        <p>Stop wasting time standing in line — book your serial from home and get live updates.</p>
                        <Link href="/book-serial" className="btn btn-solid btn-lg">Book your serial</Link>
                    </div>
                </section>

               {/* ============ FOOTER (Full Width - Left, Middle, Right) ============ */}
                    <footer style={{ 
                        backgroundColor: '#e0f2fe', 
                        borderTop: '1px solid rgba(14,58,53,0.12)', 
                        width: '100%',
                        padding: '56px 40px 32px',
                        boxSizing: 'border-box'
                    }}>
                        
                        {/* Main Footer Row: Left, Middle, Right */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start',
                            gap: '40px',
                            flexWrap: 'wrap',
                            marginBottom: '40px',
                            width: '100%'
                        }}>
                            
                            {/* Dhanmondi Dental (Logo + Text) */}
                            <div style={{ 
                                textAlign: 'left', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'flex-start',
                                maxWidth: '320px'
                            }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <img src="/images/logo.png" alt="Dhanmondi Dental Center" style={{ height: '45px', display: 'block' }} />
                                </div>
                                <p style={{ 
                                    fontWeight: 700, 
                                    margin: 0, 
                                    fontSize: '13.5px', 
                                    color: 'rgba(26,26,24,0.75)', 
                                    lineHeight: '1.6',
                                    textAlign: 'left'
                                }}>
                                    A trusted dental chamber in Dhaka. The right care, at the right time.
                                </p>
                            </div>

                            {/*HOME + CHAMBER*/}
                            <div style={{ 
                                display: 'flex', 
                                gap: '80px', 
                                justifyContent: 'center',
                                flex: 1,
                                minWidth: '300px'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h4 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '12.5px', letterSpacing: '0.06em', color: 'rgba(26,26,24,0.55)', textTransform: 'uppercase', margin: '0 0 16px 0' }}>HOME</h4>
                                    <a href="https://www.facebook.com/dhanmondidental" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', marginBottom: '10px', textDecoration: 'none', fontWeight: 700 }}>Facebook</a>
                                    <a href="https://www.youtube.com/channel/UCLrFfn1hA1HidZv__pLIbKw" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', marginBottom: '10px', textDecoration: 'none', fontWeight: 700 }}>YouTube</a>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h4 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '12.5px', letterSpacing: '0.06em', color: 'rgba(26,26,24,0.55)', textTransform: 'uppercase', margin: '0 0 16px 0' }}>CHAMBER</h4>
                                    <a href="#doctors" style={{ display: 'block', fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', marginBottom: '10px', textDecoration: 'none', fontWeight: 700 }}>Doctors</a>
                                    <a href="#services" style={{ display: 'block', fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', marginBottom: '10px', textDecoration: 'none', fontWeight: 700 }}>Services</a>
                                </div>
                            </div>

                            {/*CONTACT */}
                            <div style={{ 
                                textAlign: 'right', 
                                maxWidth: '350px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end'
                            }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '12.5px', letterSpacing: '0.06em', color: 'rgba(26,26,24,0.55)', textTransform: 'uppercase', margin: '0 0 16px 0' }}>CONTACT</h4>
                                <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', lineHeight: '1.7', textAlign: 'right', margin: '0 0 8px 0' }}>Dhanmondi Dental Center</p>
                                <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', lineHeight: '1.7', textAlign: 'right', margin: '0 0 8px 0' }}>
                                    Concord Arcadia Shopping Mall (5th floor), Dhanmondi, Dhaka- 1205, Bangladesh
                                </p>
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginBottom: '10px', flexWrap: 'wrap' }}>
                                    <a href="tel:+8801770008811" style={{ fontWeight: 700, fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', textDecoration: 'none' }}>+88 01770008811</a>
                                    <a href="tel:+8801770008833" style={{ fontWeight: 700, fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', textDecoration: 'none' }}>+88 1770008833</a>
                                </div>
                                <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', lineHeight: '1.7', textAlign: 'right', margin: '0 0 8px 0' }}>
                                    Make a doctor's appointment by calling between 11am To 9pm.
                                </p>
                                <p style={{ fontWeight: 700, margin: 0, fontSize: '13.5px', color: 'rgba(26,26,24,0.8)', textAlign: 'right' }}>
                                    <a href="http://www.ddentalcenter.com" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: 'rgba(26,26,24,0.8)', textDecoration: 'none' }}>www.ddentalcenter.com</a>
                                </p>
                            </div>
                        </div>

                        {/* Footer Bottom (Copyright) */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            paddingTop: '28px', 
                            borderTop: '1px solid rgba(14,58,53,0.12)', 
                            fontSize: '12.5px', 
                            color: 'rgba(26,26,24,0.6)', 
                            fontWeight: 700,
                            width: '100%'
                        }}>
                            <span>© 2026 Dhanmondi Dental Center. All rights reserved.</span>
                            <span>9 AM – 8 PM, every day</span>
                        </div>

                    </footer>
            </div>
        </>
    );
}