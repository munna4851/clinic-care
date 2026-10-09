import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="BrightSmile — Dental Chamber" />
            
            {/* 🎨 ইনজেক্টেড কাস্টম সিএসএস স্টাইল (আপনার থিমের কালার ও গ্রিড ঠিক রাখার জন্য) */}
            <style>{`
                :root {
                    --bg:         #FAFAF7;
                    --ink:        #1A1A18;
                    --teal:       #0E3A35;
                    --teal-2:     #145C53;
                    --green:      #1F8A70;
                    --green-l:    #E4F3EE;
                    --sand:       #E8E3D8;
                    --sand-2:     #F1ECE0;
                    --terracotta: #C75D3D;
                    --terracotta-l: #FBE9E2;
                    --line:       rgba(14,58,53,0.12);
                    --shadow:     0 1px 2px rgba(14,58,53,0.04), 0 8px 24px rgba(14,58,53,0.06);
                }

                .bright-smile-body {
                    background: var(--bg);
                    color: var(--ink);
                    font-family: 'Inter', sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                .font-fraunces {
                    font-family: 'Fraunces', serif;
                }

                .mono {
                    font-family: 'JetBrains Mono', monospace;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }

                .wrap { max-width: 1180px; margin: 0 auto; padding: 0 28px; }

                /* ---------- Topbar ---------- */
                .topbar {
                    position: sticky; top: 0; z-index: 50;
                    background: rgba(250,250,247,0.86);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid var(--line);
                }
                .topbar-inner {
                    display: flex; align-items: center; justify-content: space-between;
                    height: 72px;
                }
                .brand { display: flex; align-items: center; gap: 10px; }
                .brand-mark {
                    width: 36px; height: 36px; border-radius: 10px;
                    background: var(--teal);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .brand-name { font-family: 'Fraunces', serif; font-weight: 600; font-size: 19px; color: var(--teal); }
                .brand-name span { color: var(--green); }

                .nav-links { display: flex; align-items: center; gap: 30px; }
                .nav-links a {
                    font-size: 14.5px; font-weight: 500; color: var(--ink); opacity: 0.72;
                    transition: opacity .15s;
                }
                .nav-links a:hover { opacity: 1; }

                .topbar-actions { display: flex; align-items: center; gap: 10px; }

                .btn {
                    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
                    font-size: 14.5px; font-weight: 600;
                    padding: 10px 20px; border-radius: 9px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: transform .15s, background .15s, border-color .15s, box-shadow .15s;
                    white-space: nowrap;
                }
                .btn-ghost { background: transparent; color: var(--teal); border-color: var(--line); }
                .btn-ghost:hover { background: var(--sand-2); }
                .btn-solid { background: var(--teal); color: #fff; }
                .btn-solid:hover { background: var(--teal-2); transform: translateY(-1px); box-shadow: var(--shadow); }
                .btn-lg { padding: 14px 26px; font-size: 15.5px; border-radius: 10px; }

                /* ---------- Hero ---------- */
                .hero { position: relative; padding: 76px 0 0; overflow: hidden; }
                .hero::before {
                    content: ''; position: absolute; top: -180px; right: -180px;
                    width: 520px; height: 520px; border-radius: 50%;
                    background: radial-gradient(circle, var(--green-l) 0%, transparent 72%);
                    z-index: 0;
                }
                .hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }

                .eyebrow {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-size: 13px; font-weight: 600; color: var(--green);
                    background: var(--green-l); padding: 6px 13px; border-radius: 99px; margin-bottom: 22px;
                }
                .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

                .hero h1 { font-family: 'Fraunces', serif; font-size: 50px; color: var(--teal); margin-bottom: 20px; font-weight: 600; line-height: 1.08; }
                .hero h1 em { font-style: italic; color: var(--terracotta); font-weight: 500; }
                .hero p.lead { font-size: 17px; line-height: 1.65; color: rgba(26,26,24,0.68); max-width:480px; margin-bottom: 32px; }
                .hero-ctas { display: flex; gap: 12px; margin-bottom: 40px; flex-wrap: wrap; }
                .hero-trust { display: flex; gap: 28px; flex-wrap: wrap; }
                .trust-item { display: flex; flex-direction: column; }
                .trust-item .num { font-family: 'Fraunces', serif; font-size: 25px; font-weight: 600; color: var(--teal); }
                .trust-item .lbl { font-size: 12.5px; color: rgba(26,26,24,0.55); margin-top: 1px; }

                /* ---------- Queue board ---------- */
                .queue-board {
                    position: relative; z-index: 1; background: var(--teal); border-radius: 20px;
                    padding: 26px 26px 22px; color: #fff; box-shadow: 0 24px 60px -12px rgba(14,58,53,0.45);
                }
                .queue-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
                .queue-head h3 { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.6); letter-spacing: 0.04em; text-transform: uppercase; }
                .queue-head .live { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #7FDCC0; font-weight: 600; }
                .queue-head .live .dot { width: 6px; height: 6px; border-radius: 50%; background: #7FDCC0; animation: pulse 1.6s infinite; }

                .queue-now { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
                .queue-now .label { font-size: 12px; color: rgba(255,255,255,0.55); margin-bottom: 6px; }
                .queue-now .serial { font-size: 38px; color: #fff; }
                .queue-now .doc-info { text-align: right; }
                .queue-now .doc-name { font-size: 14.5px; font-weight: 600; }
                .queue-now .doc-room { font-size: 12px; color: rgba(255,255,255,0.55); margin-top: 2px; }

                .queue-list { display: flex; flex-direction: column; gap: 1px; }
                .queue-row { display: flex; align-items: center; justify-content: space-between; padding: 11px 4px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13.5px; }
                .queue-row .qr-left { display: flex; align-items: center; gap: 10px; }
                .queue-row .qr-serial { font-size: 14px; color: rgba(255,255,255,0.85); min-width: 34px; }
                .queue-row .qr-doc { color: rgba(255,255,255,0.6); }
                .queue-row .qr-status { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 99px; }
                .st-waiting { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
                .st-next    { background: #C75D3D; color: #fff; }
                .queue-foot { margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between; }
                .queue-foot a { font-size: 13px; font-weight: 600; color: #7FDCC0; display: flex; align-items: center; gap: 5px; }
                .queue-foot .updated { font-size: 11.5px; color: rgba(255,255,255,0.4); }

                /* ---------- Section Shells ---------- */
                section { padding: 84px 0; }
                .section-head { max-width: 560px; margin-bottom: 48px; }
                .section-eyebrow { font-size: 12.5px; font-weight: 700; color: var(--green); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; display: block; }
                .section-head h2 { font-family: 'Fraunces', serif; font-size: 34px; color: var(--teal); margin-bottom: 12px; font-weight: 600; }
                .section-head p { font-size: 15.5px; color: rgba(26,26,24,0.6); line-height: 1.6; }

                /* ---------- Services ---------- */
                .services-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
                .service-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 26px 22px; transition: transform .2s, box-shadow .2s; }
                .service-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); border-color: transparent; }
                .service-icon { width: 42px; height: 42px; border-radius: 11px; background: var(--green-l); color: var(--green); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
                .service-card h3 { font-size: 16.5px; font-weight: 600; color: var(--ink); margin-bottom: 7px; }
                .service-card p { font-size: 13.5px; color: rgba(26,26,24,0.58); line-height: 1.55; }

                /* ---------- Doctors ---------- */
                .doctors-band { background: var(--sand-2); }
                .doctors-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
                .doc-card { background: #fff; border-radius: 18px; padding: 24px; border: 1px solid var(--line); display: flex; gap: 16px; align-items: flex-start; }
                .doc-avatar { width: 58px; height: 58px; border-radius: 14px; flex-shrink: 0; background: linear-gradient(135deg,var(--teal),var(--green)); display: flex; align-items: center; justify-content: center; color: #fff; font-family: 'Fraunces',serif; font-weight: 600; font-size: 19px; }
                .doc-card h3 { font-size: 16px; font-weight: 600; color: var(--ink); margin-bottom: 3px; }
                .doc-card .spec { font-size: 13px; color: var(--green); font-weight: 600; margin-bottom: 8px; }
                .doc-card .avail { font-size: 12.5px; color: rgba(26,26,24,0.55); display: flex; align-items: center; gap: 6px; }
                .doc-card .avail .dot { width: 5px; height: 5px; border-radius: 50%; background: #1F8A70; }

                /* ---------- Steps ---------- */
                .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 0; position: relative; }
                .step-item { position: relative; padding-right: 30px; }
                .step-num { font-family: 'JetBrains Mono',monospace; font-weight: 700; font-size: 13px; color: var(--terracotta); margin-bottom: 14px; display: block; }
                .step-item h3 { font-size: 18px; font-weight: 600; color: var(--teal); margin-bottom: 8px; }
                .step-item p { font-size: 13.5px; color: rgba(26,26,24,0.6); line-height: 1.6; }
                .step-divider { position: absolute; top: 7px; right: 0; width: 1px; height: 70%; background: var(--line); }

                /* ---------- Access band ---------- */
                .access-band { background: var(--teal); color: #fff; }
                .access-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
                .access-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 24px 20px; transition: background .2s, transform .2s; }
                .access-card:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); transform: translateY(-2px); }
                .access-icon { width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
                .access-card h3 { font-size: 15.5px; font-weight: 600; margin-bottom: 5px; }
                .access-card p { font-size: 12.5px; color: rgba(255,255,255,0.55); margin-bottom: 16px; line-height: 1.5; }
                .access-actions { display: flex; gap: 8px; }
                .btn-on-dark { flex: 1; padding: 8px 0; font-size: 13px; border-radius: 8px; text-align: center; font-weight: 600; display: block; }
                .access-login { background: #fff; color: var(--teal); }
                .access-login:hover { background: #EFEFEF; }
                .access-register { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); }
                .access-register:hover { border-color: rgba(255,255,255,0.6); }

                /* ---------- CTA & Footer ---------- */
                .cta-band { text-align: center; }
                .cta-band h2 { font-family: 'Fraunces', serif; font-size: 32px; color: var(--teal); margin-bottom: 14px; font-weight: 600; }
                .cta-band p { font-size: 15.5px; color: rgba(26,26,24,0.6); max-width: 480px; margin: 0 auto 30px; line-height: 1.6; }
                footer { background: #fff; border-top: 1px solid var(--line); padding: 48px 0 28px; }
                .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 32px; margin-bottom: 36px; }
                .footer-brand p { font-size: 13.5px; color: rgba(26,26,24,0.55); margin-top: 12px; max-width: 260px; line-height: 1.6; }
                .footer-col h4 { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: rgba(26,26,24,0.45); margin-bottom: 14px; }
                .footer-col a { display: block; font-size: 13.5px; color: rgba(26,26,24,0.7); margin-bottom: 10px; }
                .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid var(--line); font-size: 12.5px; color: rgba(26,26,24,0.45); }

                /* ---------- Responsive Mobile ---------- */
                @media (max-width: 920px) {
                    .nav-links { display: none; }
                    .hero-grid { grid-template-columns: 1fr; }
                    .hero h1 { font-size: 36px; }
                    .services-grid { grid-template-columns: repeat(2,1fr); }
                    .doctors-grid { grid-template-columns: 1fr; }
                    .steps-grid { grid-template-columns: 1fr; gap: 28px; }
                    .step-divider { display: none; }
                    .access-grid { grid-template-columns: repeat(2,1fr); }
                    .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
                }
                @media (max-width: 560px) {
                    .services-grid, .access-grid, .footer-grid { grid-template-columns: 1fr; }
                    .hero h1 { font-size: 30px; }
                    .hero-ctas { flex-direction: column; }
                    .hero-ctas .btn { width: 100%; }
                }
            `}</style>

            <div className="bright-smile-body antialiased selection:bg-[#1F8A70] selection:text-white">
                
                {/* ============ TOPBAR ============ */}
                <header className="topbar">
                    <div className="wrap topbar-inner">
                        <div className="brand">
                            <div className="brand-mark">
                                <svg viewBox="0 0 24 24" fill="none" width="19" height="19"><path d="M12 21s-7-6.5-7-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 12-7 12-1 0-1-1-2-1s-1 1-2 1Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                            </div>
                            <span className="brand-name">Bright<span>Smile</span></span>
                        </div>

                        <nav className="nav-links">
                            <a href="#services">Services</a>
                            <a href="#queue">Today's Queue</a>
                            <a href="#doctors">Doctors</a>
                            <a href="#process">How It Works</a>
                        </nav>

                        <div className="topbar-actions">
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="btn btn-solid">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="btn btn-ghost">Log in</Link>
                                    {/*<Link href={route('register')} className="btn btn-solid">Get a Serial</Link>*/}
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
                            <span className="eyebrow"><span className="dot"></span> Open today — 9 AM to 8 PM</span>
                            <h1>Caring for your teeth, <em>one serial</em> at a time</h1>
                            <p className="lead">A trusted dental chamber in Dhaka. Book your serial online, track your spot on the live queue board, and spend less time waiting.</p>
                            <div className="hero-ctas">
                                <Link href="/book-serial" className="btn btn-solid btn-lg">
                                    Book your serial
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </Link>
                                <a href="#queue" className="btn btn-ghost btn-lg">View live queue</a>
                            </div>
                            <div className="hero-trust">
                                <div className="trust-item"><span className="num mono">4</span><span className="lbl">Experienced doctors</span></div>
                                <div className="trust-item"><span className="num mono">12+</span><span className="lbl">Years of service</span></div>
                                <div className="trust-item"><span className="num mono">9.2k</span><span className="lbl">Happy patients</span></div>
                            </div>
                        </div>

                        {/* Signature: live queue board */}
                        <div className="queue-board" id="queue">
                            <div className="queue-head">
                                <h3>Today's Queue Board</h3>
                                <span className="live"><span className="dot"></span> LIVE</span>
                            </div>

                            <div className="queue-now">
                                <div>
                                    <p className="label">Now serving</p>
                                    <p className="serial mono">#18</p>
                                </div>
                                <div className="doc-info">
                                    <p className="doc-name">Dr. Farhana Rahman</p>
                                    <p className="doc-room">Chamber — 2</p>
                                </div>
                            </div>

                            <div className="queue-list">
                                <div className="queue-row">
                                    <div className="qr-left">
                                        <span className="qr-serial mono">#19</span>
                                        <span className="qr-doc">Dr. Farhana Rahman</span>
                                    </div>
                                    <span className="qr-status st-next">Next</span>
                                </div>
                                <div className="queue-row">
                                    <div className="qr-left">
                                        <span className="qr-serial mono">#20</span>
                                        <span className="qr-doc">Dr. Farhana Rahman</span>
                                    </div>
                                    <span className="qr-status st-waiting">Waiting</span>
                                </div>
                                <div className="queue-row">
                                    <div className="qr-left">
                                        <span className="qr-serial mono">#07</span>
                                        <span className="qr-doc">Dr. Imran Hossain</span>
                                    </div>
                                    <span className="qr-status st-waiting">Waiting</span>
                                </div>
                                <div className="queue-row">
                                    <div className="qr-left">
                                        <span className="qr-serial mono">#08</span>
                                        <span className="qr-doc">Dr. Imran Hossain</span>
                                    </div>
                                    <span className="qr-status st-waiting">Waiting</span>
                                </div>
                            </div>

                            <div className="queue-foot">
                                <a href="#access">See all serials →</a>
                                <span className="updated">Updated 2 minutes ago</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ SERVICES ============ */}
                <section id="services">
                    <div className="wrap">
                        <div className="section-head">
                            <span className="section-eyebrow">Our Services</span>
                            <h2>Everything your teeth need, under one roof</h2>
                            <p>From routine check-ups to complex procedures — every service led by our experienced team.</p>
                        </div>

                        <div className="services-grid">
                            <div className="service-card">
                                <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" width="21" height="21"><path d="M12 21s-7-6.5-7-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 12-7 12-1 0-1-1-2-1s-1 1-2 1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg></div>
                                <h3>General Check-ups</h3>
                                <p>Routine exams and cleaning — catch problems before they start.</p>
                            </div>
                            <div className="service-card">
                                <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" width="21" height="21"><path d="M4 12h4l2 8 4-16 2 8h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                                <h3>Root Canal Treatment</h3>
                                <p>Pain-free root canal procedures using modern equipment.</p>
                            </div>
                            <div className="service-card">
                                <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" width="21" height="21"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                                <h3>Scaling &amp; Polishing</h3>
                                <p>Remove plaque and stains, and bring back a brighter smile.</p>
                            </div>
                            <div className="service-card">
                                <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" width="21" height="21"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.7"/><path d="M9 9h6M9 13h6M9 17h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg></div>
                                <h3>Braces &amp; Orthodontics</h3>
                                <p>Modern braces and aligners with a proper diagnosis first.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ DOCTORS ============ */}
                <section className="doctors-band" id="doctors">
                    <div className="wrap">
                        <div className="section-head">
                            <span className="section-eyebrow">Our Doctors</span>
                            <h2>Experienced hands you can trust</h2>
                            <p>Every doctor runs their own queue — choose the doctor you'd like to see.</p>
                        </div>

                        <div className="doctors-grid">
                            <div className="doc-card">
                                <div className="doc-avatar">FR</div>
                                <div>
                                    <h3>Dr. Farhana Rahman</h3>
                                    <p className="spec">General &amp; Cosmetic Dentistry</p>
                                    <p className="avail"><span className="dot"></span> Available today — Chamber 2</p>
                                </div>
                            </div>
                            <div className="doc-card">
                                <div className="doc-avatar">IH</div>
                                <div>
                                    <h3>Dr. Imran Hossain</h3>
                                    <p className="spec">Orthodontist</p>
                                    <p className="avail"><span className="dot"></span> Available today — Chamber 1</p>
                                </div>
                            </div>
                            <div className="doc-card">
                                <div className="doc-avatar">NJ</div>
                                <div>
                                    <h3>Dr. Nusrat Jahan</h3>
                                    <p className="spec">Root Canal Specialist</p>
                                    <p className="avail"><span className="dot" style={{background: '#C75D3D'}}></span> Available from tomorrow</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ PROCESS ============ */}
                <section id="process">
                    <div className="wrap">
                        <div className="section-head">
                            <span className="section-eyebrow">How It Works</span>
                            <h2>Your serial, in three steps</h2>
                        </div>

                        <div className="steps-grid">
                            <div className="step-item">
                                <span className="step-num">01</span>
                                <h3>Choose your doctor</h3>
                                <p>Pick the doctor you prefer and a convenient time slot.</p>
                                <div className="step-divider"></div>
                            </div>
                            <div className="step-item">
                                <span className="step-num">02</span>
                                <h3>Get your serial number</h3>
                                <p>Receive a serial number instantly — visible on the live board.</p>
                                <div className="step-divider"></div>
                            </div>
                            <div className="step-item">
                                <span className="step-num">03</span>
                                <h3>Arrive at the right time</h3>
                                <p>Check the live board to know when to come in — no standing in line.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ ACCESS (Roles Portal) ============ */}
                <section className="access-band" id="access">
                    <div className="wrap">
                        <div className="section-head">
                            <span className="section-eyebrow" style={{color: '#7FDCC0'}}>Sign In</span>
                            <h2 style={{color: '#fff'}}>Choose who you are</h2>
                            <p style={{color: 'rgba(255,255,255,0.6)'}}>Patient, doctor, staff, or admin — each has their own dedicated panel.</p>
                        </div>

                        <div className="access-grid">
                            {/* Patient Card */}
                            <div className="access-card">
                                <div className="access-icon"><svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="8" r="3.5" stroke="#fff" strokeWidth="1.6"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg></div>
                                <h3>Patient</h3>
                                <p>Book a serial, view your history, and download reports.</p>
                                <div className="access-actions">
                                    <Link href={route('login')} className="btn-on-dark access-login">Log in</Link>
                                    <Link href={route('register')} className="btn-on-dark access-register">Register</Link>
                                </div>
                            </div>

                            {/* Doctor Card */}
                            <div className="access-card">
                                <div className="access-icon"><svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 21s-7-6.5-7-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 12-7 12-1 0-1-1-2-1s-1 1-2 1Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/></svg></div>
                                <h3>Doctor</h3>
                                <p>View today's queue, manage patient records and prescriptions.</p>
                                <div className="access-actions">
                                   {/*<Link href={route('login')} className="btn-on-dark access-login">Log in</Link>*/}
                                   <Link href={route('login', { type: 'doctor' })} className="btn-on-dark access-login">Log in</Link>
                                </div>
                            </div>

                            {/* Staff Card */}
                            <div className="access-card">
                                <div className="access-icon"><svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#fff" strokeWidth="1.6"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#fff" strokeWidth="1.6"/></svg></div>
                                <h3>Staff</h3>
                                <p>Manage the queue, handle billing, and run daily chamber operations.</p>
                                <div className="access-actions">
                                    {/*<Link href={route('login')} className="btn-on-dark access-login">Log in</Link>*/}
                                    <Link href={route('login', { type: 'staff' })} className="btn-on-dark access-login">Log in</Link>
                                </div>
                            </div>

                            {/* Admin Card */}
                            <div className="access-card">
                                <div className="access-icon"><svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/></svg></div>
                                <h3>Admin</h3>
                                <p>Full control of the chamber — finances, staff, and reports.</p>
                                <div className="access-actions">
                                   {/* <Link href={route('login')} className="btn-on-dark access-login">Log in</Link> */}
                                   <Link href={route('login', { type: 'admin' })} className="btn-on-dark access-login">Log in</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ CTA ============ */}
                <section className="cta-band">
                    <div className="wrap">
                        <h2>Reserve your serial today</h2>
                        <p>Stop wasting time standing in line — book your serial from home and get live updates.</p>
                        <Link href="/book-serial" className="btn btn-solid btn-lg">Book your serial</Link>
                    </div>
                </section>

                {/* ============ FOOTER ============ */}
                <footer>
                    <div className="wrap">
                        <div className="footer-grid">
                            <div className="footer-brand">
                                <div className="brand">
                                    <div className="brand-mark">
                                        <svg viewBox="0 0 24 24" fill="none" width="19" height="19"><path d="M12 21s-7-6.5-7-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 12-7 12-1 0-1-1-2-1s-1 1-2 1Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                                    </div>
                                    <span className="brand-name">Bright<span>Smile</span></span>
                                </div>
                                <p>A trusted dental chamber in Dhaka. The right care, at the right time.</p>
                            </div>
                            <div className="footer-col">
                                <h4>Services</h4>
                                <a href="#services">Check-ups</a>
                                <a href="#services">Root canal</a>
                                <a href="#services">Scaling</a>
                                <a href="#services">Braces</a>
                            </div>
                            <div className="footer-col">
                                <h4>Chamber</h4>
                                <a href="#doctors">Doctors</a>
                                <a href="#queue">Live queue</a>
                                <a href="#process">How it works</a>
                            </div>
                            <div className="footer-col">
                                <h4>Contact</h4>
                                <a href="tel:+8801700000000">+880 1700-000000</a>
                                <a href="#">Dhanmondi, Dhaka</a>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <span>© 2026 BrightSmile Dental Chamber</span>
                            <span>9 AM – 8 PM, every day</span>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}