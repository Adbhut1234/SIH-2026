
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary-container">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6"><div className="flex items-center gap-4 shrink-0"><img alt="TerraVerify Enterprise" className="h-8 w-auto object-contain" src="/logo.svg"/><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">TerraVerify</span><span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest leading-none mt-1">Cadastral OS</span></div></div><nav className="hidden xl:flex items-center gap-8" data-active-classes="text-on-surface font-semibold"><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="platform" href="/">Platform</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="cadastral-ai" href="/">Cadastral AI</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="verification-ledger" href="/">Verification</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="solutions" href="/">Solutions</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="documentation" href="/">Docs</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="enterprise-security" href="/">Enterprise</a></nav><div className="flex items-center gap-4"><a className="hidden sm:inline-flex items-center justify-center font-label-md text-label-md px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:bg-surface-container-high transition-colors" data-path="book-underwriter-demo" href="/">Book Demo</a><Link className="inline-flex items-center justify-center font-label-md text-label-md px-4 py-2 rounded-lg bg-primary text-on-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-primary-container transition-colors gap-2" href="/login" ><span>Launch Portal</span><span className="font-mono-data text-[10px] bg-white/20 px-1 py-0.5 rounded">⌘↵</span></Link><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-20 bg-background flex-1"><div className="flex flex-col w-full">
{/* Top Decorative Ambient Glow */}
<div className="relative w-full overflow-hidden">
<div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-secondary-container/30 via-surface-container/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>
{/* HERO SECTION */}
<section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-16 lg:pb-24 relative">
<div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
{/* Live Status Pill */}
<div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-low shadow-sm mb-6">
<span className="relative flex h-2.5 w-2.5">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
</span>
<span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">Next-Gen Cadastral AI &amp; Sovereign Land Ledger</span>
<span className="font-mono-data text-body-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded-full">HSM Enclave Active</span>
</div>
{/* Headline */}
<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mb-6 font-bold">
          Autonomous Land Deed Extraction <br className="hidden sm:inline"/>
<span className="text-secondary">&amp; Spatial Verification</span>
</h1>
{/* Subtitle */}
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-8">
          Turn multi-century scanned deeds, khasra extracts, and surveyor plats into immutable, GIS-anchored cadastral truth in seconds with zero human data leakage.
        </p>
{/* CTA Buttons Group */}
<div className="flex flex-wrap items-center justify-center gap-4">
<Link className="inline-flex items-center justify-center font-label-md text-label-md px-6 py-3.5 rounded-lg bg-primary text-on-primary shadow-md hover:bg-primary-container transition-all transform active:scale-95 gap-3 group" href="/login" >
<span className="font-semibold">Launch Verification Portal</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
<span className="font-mono-data text-body-sm bg-surface/20 text-on-primary px-1.5 py-0.5 rounded">⌘↵</span>
</Link>
<a className="inline-flex items-center justify-center font-label-md text-label-md px-6 py-3.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container transition-all gap-2" href="#workbench-preview">
<span className="material-symbols-outlined text-[20px] text-secondary">explore</span>
<span>Explore Interactive Sample Deed</span>
</a>
</div>
</div>
{/* INTERACTIVE HERO WORKBENCH CARD */}
<div className="w-full bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden" id="workbench-preview">
{/* Workbench Window Header Bar */}
<div className="bg-surface-container-low px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-error/60 inline-block"></span>
<span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim/90 inline-block"></span>
<span className="w-3 h-3 rounded-full bg-secondary-fixed-dim inline-block"></span>
</div>
<span className="font-mono-data text-body-sm text-on-surface font-semibold pl-2">Khasra_Record_142_3_1984_Verified.cad</span>
<span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">SHA-256 Validated</span>
</div>
<div className="flex items-center gap-4 text-on-surface-variant font-mono-data text-body-sm">
<span className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
              Underwriter Trust: 99.8%
            </span>
<span className="hidden sm:inline text-surface-dim">|</span>
<span className="hidden sm:inline">Enclave: HSM-Zone-Mumbai-04</span>
</div>
</div>
{/* Workbench Split Pane */}
<div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
{/* Left: Scanned Historical Deed Viewport & Cadastral Vector */}
<div className="lg:col-span-6 bg-surface-container-low/40 p-6 flex flex-col justify-between relative overflow-hidden">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">description</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Source Deed &amp; Traverse Geometry</span>
</div>
<div className="flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded shadow-sm font-mono-data text-body-sm text-on-surface-variant">
<span>Zoom: 140%</span>
</div>
</div>
{/* Visual Graphic: Deed with Metes Polygon Overlay */}
<div className="relative w-full h-72 bg-surface-container-lowest rounded-lg shadow-inner overflow-hidden p-4 flex flex-col justify-center items-center">
{/* Parchment pattern effect via SVG */}
<svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
<defs>
<pattern height="24" id="cadastral-grid" patternUnits="userSpaceOnUse" width="24">
<path className="text-on-surface-variant" d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
</pattern>
</defs>
<rect fill="url(#cadastral-grid)" height="100%" width="100%"></rect>
</svg>
{/* Cadastral Polygon SVG Overlay */}
<svg className="w-full h-full relative z-10" viewBox="0 0 400 240">
{/* Historic Parcel Boundary Background */}
<polygon className="text-surface-container-highest/60" fill="currentColor" points="60,40 280,30 360,180 180,210 40,160" stroke="#76777d" strokeDasharray="3,3" strokeWidth="1.5"></polygon>
{/* Resolved Sovereign Cadastral Boundary Loop */}
<polygon className="text-secondary-container/25" fill="currentColor" points="62,42 278,32 358,178 182,208 42,158" stroke="#006c4a" strokeWidth="2.5"></polygon>
{/* Traverse Points */}
<circle cx="62" cy="42" fill="#006c4a" r="4.5"></circle>
<circle cx="278" cy="32" fill="#006c4a" r="4.5"></circle>
<circle cx="358" cy="178" fill="#006c4a" r="4.5"></circle>
<circle cx="182" cy="208" fill="#006c4a" r="4.5"></circle>
<circle cx="42" cy="158" fill="#006c4a" r="4.5"></circle>
{/* Interactive Metes Measurement Labels */}
<text className="fill-on-surface font-mono-data text-[10px] font-semibold" x="140" y="26">N 74°12' E • 412.4m</text>
<text className="fill-on-surface font-mono-data text-[10px] font-semibold" x="325" y="110">S 18°04' E • 268.9m</text>
<text className="fill-on-surface font-mono-data text-[10px] font-semibold" x="235" y="210">S 68°30' W • 310.2m</text>
<text className="fill-on-surface font-mono-data text-[10px] font-semibold" x="75" y="195">N 42°15' W • 185.0m</text>
{/* Center Cadastral Marker */}
<rect className="shadow-md" fill="#131b2e" height="34" rx="4" width="90" x="155" y="95"></rect>
<text className="font-mono-data text-[10px] font-bold" fill="#ffffff" x="165" y="110">KHASRA 142/3</text>
<text className="font-mono-data text-[9px]" fill="#85f8c4" x="165" y="122">4.821 Hectares</text>
</svg>
{/* Stamp Occlusion & OCR Indicator */}
<div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded shadow-sm flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm text-on-surface">Sub-Registrar Stamp: Verified Authentic (1984)</span>
</div>
</div>
{/* Deed Bottom Status Bar */}
<div className="flex items-center justify-between pt-4 mt-2">
<div className="flex items-center gap-2 font-mono-data text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
<span>Cryptographic Digest: 7e89…c901a</span>
</div>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">Zero Loop Closure Error (0.002m)</span>
</div>
</div>
{/* Right: Real-time Extraction Pipeline & Audit Ledger */}
<div className="lg:col-span-6 bg-surface-container-lowest p-6 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-5">
<div>
<span className="font-headline-sm text-headline-sm text-on-surface">Automated Underwriter Extraction</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Extracted in 3.42s with Sovereign Cadastral AI v4.18</p>
</div>
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[15px]">check_circle</span>
<span>Auto-Reconciled</span>
</div>
</div>
{/* Key Extraction Entities Table */}
<div className="flex flex-col gap-3">
{/* Entity 1: PIN & Parcel */}
<div className="p-3 bg-surface rounded-lg shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Parcel ID (PIN / Survey)</span>
<span className="font-mono-data text-headline-sm text-on-surface font-semibold">MH-PUN-HAV-142-03</span>
</div>
<div className="text-right">
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">100% Match</span>
<div className="font-mono-data text-body-sm text-on-surface-variant mt-0.5">RoR Vol. 82, Pg 119</div>
</div>
</div>
{/* Entity 2: Current & Historic Grantor */}
<div className="p-3 bg-surface rounded-lg shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Title Holder &amp; Succession</span>
<span className="font-headline-sm text-headline-sm text-on-surface">V. R. Kulkarni → Sovereign Trust</span>
</div>
<div className="text-right">
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">No Encumbrances</span>
<div className="font-mono-data text-body-sm text-on-surface-variant mt-0.5">Unbroken 40-Yr Chain</div>
</div>
</div>
{/* Entity 3: Area Computation & Variance */}
<div className="p-3 bg-surface rounded-lg shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Computed Net Area</span>
<div className="flex items-center gap-2">
<span className="font-headline-sm text-headline-sm text-on-surface">11.91 Acres</span>
<span className="font-mono-data text-body-sm text-on-surface-variant">(48,210 sq.m)</span>
</div>
</div>
<div className="text-right">
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">±0.00% Variance</span>
<div className="font-mono-data text-body-sm text-on-surface-variant mt-0.5">GIS Traverse Match</div>
</div>
</div>
{/* Entity 4: Sovereign Seal Verification */}
<div className="p-3 bg-surface rounded-lg shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Stamp Duty &amp; Revenue Seal</span>
<span className="font-mono-data text-body-md text-on-surface font-semibold">Series G #8820491-Maharashtra</span>
</div>
<div className="text-right">
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">Pre-1985 Format Pass</span>
<div className="font-mono-data text-body-sm text-on-surface-variant mt-0.5">Occlusion Inpainted</div>
</div>
</div>
</div>
</div>
{/* Card Bottom Action Bar */}
<div className="pt-4 mt-4 flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[20px] text-secondary">verified_user</span>
<span className="font-label-md text-label-md text-on-surface font-medium">Ready for Ledger Endorsement</span>
</div>
<button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold shadow-sm hover:opacity-90 transition-opacity">
<span>Commit Cadastral Token</span>
<span className="material-symbols-outlined text-[16px]">task_alt</span>
</button>
</div>
</div>
</div>
</div>
</section>
</div>
{/* TRUST & METRICS STRIP */}
<section className="w-full bg-surface-container-low py-12">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
{/* 4 Core Performance Numbers */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10">
<div className="flex flex-col items-center text-center">
<span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-bold tracking-tight">99.8%</span>
<span className="font-label-md text-label-md text-secondary font-semibold mt-1">Deterministic Precision</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Zero hallucination guarantee</span>
</div>
<div className="flex flex-col items-center text-center">
<span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-bold tracking-tight">&lt; 3.8s</span>
<span className="font-label-md text-label-md text-secondary font-semibold mt-1">Extraction Latency</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Full metes &amp; bounds deed deskew</span>
</div>
<div className="flex flex-col items-center text-center">
<span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-bold tracking-tight">0.0 MB</span>
<span className="font-label-md text-label-md text-secondary font-semibold mt-1">Zero-Data Cloud Footprint</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Confidential hardware enclave</span>
</div>
<div className="flex flex-col items-center text-center">
<span className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-bold tracking-tight">100%</span>
<span className="font-label-md text-label-md text-secondary font-semibold mt-1">Sovereign Tie-Downs</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Direct revenue cadastre sync</span>
</div>
</div>
{/* Institutional Logos / Sovereign Trust */}
<div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-center md:text-left">
          Trusted by Sovereign Registries &amp; Institutional Underwriters
        </span>
<div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
<div className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface font-bold">
<span className="material-symbols-outlined text-secondary text-[22px]">account_balance</span>
<span>State Revenue Directorate</span>
</div>
<div className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface font-bold">
<span className="material-symbols-outlined text-secondary text-[22px]">domain</span>
<span>National Spatial Infrastructure</span>
</div>
<div className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface font-bold">
<span className="material-symbols-outlined text-secondary text-[22px]">assured_workload</span>
<span>Tier-1 Title Reinsurers</span>
</div>
<div className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface font-bold">
<span className="material-symbols-outlined text-secondary text-[22px]">corporate_fare</span>
<span>Apex Infrastructure Bank</span>
</div>
</div>
</div>
</div>
</section>
{/* THE 5-STEP SOVEREIGN PIPELINE */}
<section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
<div className="max-w-3xl mb-16">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Deterministic Execution</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight mt-2 mb-4">
        The 5-Step Sovereign Cadastral Pipeline
      </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">
        From degrading ink handwritten deeds to tamper-evident cryptographic ledger endorsement. Every step executes inside an isolated memory enclave without external telemetry.
      </p>
</div>
{/* Pipeline Step Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
{/* Step 1 */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-mono-data text-body-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded font-semibold">01</span>
<span className="material-symbols-outlined text-secondary text-[22px]">document_scanner</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-semibold">Ingest &amp; OCR Deskew</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Multi-spectral binarization converts centuries-old Marathi, Persian, and English deeds, Khasra 7/12 records, and survey TIFFs into normalized tokens.
          </p>
</div>
<div className="pt-4 mt-4 font-mono-data text-body-sm text-on-surface-variant">
          Inpainting: Active
        </div>
</div>
{/* Step 2 */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-mono-data text-body-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded font-semibold">02</span>
<span className="material-symbols-outlined text-secondary text-[22px]">polyline</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-semibold">Autonomous GIS Alignment</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Extracts metes-and-bounds bearings, executes traverse loop closures, and anchors boundary coordinates onto high-res drone &amp; satellite orthomosaics.
          </p>
</div>
<div className="pt-4 mt-4 font-mono-data text-body-sm text-on-surface-variant">
          Loop closure: ±0.002m
        </div>
</div>
{/* Step 3 */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-mono-data text-body-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded font-semibold">03</span>
<span className="material-symbols-outlined text-secondary text-[22px]">approval_delegation</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-semibold">Discrepancy &amp; Seal Detection</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Identifies overlapping legal grants, missing inheritance chains, stamp tax fraud, and physical revenue seal tampering with micro-pixel accuracy.
          </p>
</div>
<div className="pt-4 mt-4 font-mono-data text-body-sm text-on-surface-variant">
          Seal Confidence: 99.91%
        </div>
</div>
{/* Step 4 */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-mono-data text-body-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded font-semibold">04</span>
<span className="material-symbols-outlined text-secondary text-[22px]">splitscreen</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-semibold">Underwriter Console</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Side-by-side verification console highlights extracted entities directly upon the scanned substrate. One-click resolution for anomalous title chains.
          </p>
</div>
<div className="pt-4 mt-4 font-mono-data text-body-sm text-on-surface-variant">
          Single-click signoff
        </div>
</div>
{/* Step 5 */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between bg-gradient-to-b from-surface-container-lowest to-secondary-container/10">
<div>
<div className="flex items-center justify-between mb-4">
<span className="font-mono-data text-body-sm text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded font-semibold">05</span>
<span className="material-symbols-outlined text-secondary text-[22px]">enhanced_encryption</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-semibold">Immutable Ledger Commit</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Hardware Security Module (HSM EAL6+) anchors the reconciled cadastral polygon and provenance digest onto the national sovereign registry ledger.
          </p>
</div>
<div className="pt-4 mt-4 font-mono-data text-body-sm text-secondary font-semibold">
          Final HSM Attestation
        </div>
</div>
</div>
</section>
{/* KEY ENTERPRISE VALUE PILLARS */}
<section className="w-full bg-surface-container-low py-20">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="text-center max-w-3xl mx-auto mb-16">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Institutional Grade Infrastructure</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight mt-2 mb-4">
          Architected for Sovereign Legal Finality
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">
          Where standard OCR models fail on complex land deeds, TerraVerify enforces rigorous mathematical parcel closure and hardware-level cryptographic secrecy.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Pillar 1 */}
<div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary mb-6">
<span className="material-symbols-outlined text-[28px]">explore</span>
</div>
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-3">Sub-Millimeter Spatial Precision</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              Extracts and computes geometric metes-and-bounds angles, resolving historic chain surveys against modern dual-frequency GNSS and high-resolution LiDAR layers.
            </p>
</div>
<div className="p-4 bg-surface rounded-lg">
<div className="flex items-center justify-between font-mono-data text-body-sm mb-1.5">
<span className="text-on-surface-variant">Traverse Tolerance</span>
<span className="text-secondary font-semibold">±0.005° Angle</span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-1.5">
<div className="bg-secondary h-1.5 rounded-full w-[98%]"></div>
</div>
</div>
</div>
{/* Pillar 2 */}
<div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary mb-6">
<span className="material-symbols-outlined text-[28px]">shield_lock</span>
</div>
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-3">Cryptographic Hardware Enclave</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              Processing occurs in air-gapped confidential compute memory. Sovereign title documents never train generalized third-party models and never write unencrypted to disk.
            </p>
</div>
<div className="p-4 bg-surface rounded-lg">
<div className="flex items-center justify-between font-mono-data text-body-sm mb-1.5">
<span className="text-on-surface-variant">Confidential Compute</span>
<span className="text-secondary font-semibold">FIPS 140-3 L4</span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-1.5">
<div className="bg-secondary h-1.5 rounded-full w-full"></div>
</div>
</div>
</div>
{/* Pillar 3 */}
<div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary mb-6">
<span className="material-symbols-outlined text-[28px]">speed</span>
</div>
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-3">Autonomous Underwriting</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              Cut the standard 14-day manual title search backlog down to sub-4 seconds. Enable instant clear-to-close underwriting policies with guaranteed spatial certainty.
            </p>
</div>
<div className="p-4 bg-surface rounded-lg">
<div className="flex items-center justify-between font-mono-data text-body-sm mb-1.5">
<span className="text-on-surface-variant">Search Velocity</span>
<span className="text-secondary font-semibold">310x Accelerated</span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-1.5">
<div className="bg-secondary h-1.5 rounded-full w-[94%]"></div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* INTERACTIVE UNDERWRITER COMPARISON BENCHMARK */}
<section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
<div className="max-w-3xl mb-12">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Underwriting Performance</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight mt-2 mb-3">
        Manual Title Search vs. TerraVerify Autonomous Cadastre
      </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">
        See how sovereign automation eliminates friction, risks of forged deeds, and surveying overlaps.
      </p>
</div>
{/* Side-by-Side Architectural Comparison Cards */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
{/* Legacy Approach Card */}
<div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-error inline-block"></span>
<span className="font-headline-md text-headline-md text-on-surface font-semibold">Legacy Manual Title Search</span>
</div>
<span className="font-mono-data text-body-sm text-error bg-error-container/40 px-2.5 py-1 rounded">High Discrepancy Risk</span>
</div>
<div className="flex flex-col gap-4">
<div className="p-4 bg-surface-container-low rounded-lg flex items-start gap-3">
<span className="material-symbols-outlined text-error text-[20px] mt-0.5">schedule</span>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block">14 – 21 Business Days</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Manual record retrieval across dusty district revenue sub-registrar offices.</span>
</div>
</div>
<div className="p-4 bg-surface-container-low rounded-lg flex items-start gap-3">
<span className="material-symbols-outlined text-error text-[20px] mt-0.5">error_outline</span>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block">4.2% Transcription Error Rate</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Typographical typos in survey sub-division numbers lead to costly insurance disputes.</span>
</div>
</div>
<div className="p-4 bg-surface-container-low rounded-lg flex items-start gap-3">
<span className="material-symbols-outlined text-error text-[20px] mt-0.5">wrong_location</span>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block">Zero Boundary Conflict Detection</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Unable to detect if adjoining parcels claim the same riparian or road frontage boundary.</span>
</div>
</div>
<div className="p-4 bg-surface-container-low rounded-lg flex items-start gap-3">
<span className="material-symbols-outlined text-error text-[20px] mt-0.5">no_encryption</span>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block">Vulnerable to Forged Registrations</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">No cryptographic validation of antique revenue stamps or archival ink aging.</span>
</div>
</div>
</div>
</div>
<div className="pt-6 mt-6 font-mono-data text-body-sm text-on-surface-variant">
          Estimated Cost: $480 – $1,200 per parcel review
        </div>
</div>
{/* TerraVerify Autonomous Approach Card */}
<div className="bg-surface-container-lowest p-8 rounded-xl shadow-lg flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
<span className="font-headline-md text-headline-md text-on-surface font-semibold">TerraVerify Autonomous Cadastre</span>
</div>
<span className="font-mono-data text-body-sm text-secondary bg-secondary-container/40 px-2.5 py-1 rounded">Deterministic Enclave</span>
</div>
<div className="flex flex-col gap-4">
<div className="p-4 bg-secondary-container/20 rounded-lg flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">bolt</span>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block">3.8 Seconds Per Deed</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Autonomous multi-lingual OCR, spatial geometry parsing, and entity resolution.</span>
</div>
</div>
<div className="p-4 bg-secondary-container/20 rounded-lg flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block">99.8% Mathematical Accuracy</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Deterministic verification cross-checked against RoR master index registers.</span>
</div>
</div>
<div className="p-4 bg-secondary-container/20 rounded-lg flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">layers</span>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block">Automated Spatial Overlap Audits</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Instantly calculates polygon intersection across 50 years of adjacent deeds.</span>
</div>
</div>
<div className="p-4 bg-secondary-container/20 rounded-lg flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">lock</span>
<div>
<span className="font-headline-sm text-headline-sm text-on-surface block">EAL6+ HSM Ledger Endorsement</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Produces a cryptographically sealed cadastral certificate accepted by courts.</span>
</div>
</div>
</div>
</div>
<div className="pt-6 mt-6 font-mono-data text-body-sm text-secondary font-semibold">
          Estimated Cost: Reduced by 86% with instant SLA
        </div>
</div>
</div>
</section>
{/* CALL TO ACTION BANNER */}
<section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
<div className="w-full bg-primary text-on-primary rounded-xl p-8 lg:p-14 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
{/* Background Ambient Grid Glow */}
<div className="absolute inset-0 bg-gradient-to-r from-secondary/15 via-transparent to-surface-tint/20 pointer-events-none"></div>
<div className="max-w-2xl relative z-10">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 text-secondary-container font-label-sm text-label-sm uppercase tracking-wider mb-4">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
          Institutional Sandbox Deployment
        </div>
<h2 className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-primary mb-4">
          Ready to modernize your title underwriting and cadastral records?
        </h2>
<p className="font-body-lg text-body-lg text-on-primary-container">
          Deploy an air-gapped TerraVerify enclave in your private cloud or consume via our ultra-low-latency Cadastral API v2.
        </p>
</div>
<div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10 w-full lg:w-auto">
<a className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md px-6 py-3.5 rounded-lg bg-secondary text-on-secondary shadow-md hover:opacity-95 transition-opacity font-semibold gap-2" data-path="book-underwriter-demo" href="/">
<span>Request Sandbox Access</span>
<span className="material-symbols-outlined text-[18px]">verified</span>
</a>
<a className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md px-6 py-3.5 rounded-lg bg-surface/10 text-on-primary hover:bg-surface/20 transition-colors font-medium" data-path="enterprise-security" href="/">
          Contact Enterprise Sales
        </a>
</div>
</div>
</section>
</div></main><footer className="w-full bg-surface-container-low shadow-[0_-1px_0_rgba(0,0,0,0.02)]"><div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16"><div className="lg:col-span-2 flex flex-col gap-4"><div className="flex items-center gap-3"><img alt="TerraVerify Enterprise" className="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XlQ83PkcN4WiJuzz93Yyj38AZEMzmWSRsItxETgMTdj3h-MPj03Em9biS97HYAH1uZ8bp5QR2adA9ooa-U3Fu_Tohm7OXqvKx4zV0iiYMigIhKFHswOsBYbtNydM0cwW847Nmj7CcIu5zBIEdCs6WGLNWIE08_ud7-sNe06DERAke9d08vMfY6OvX9yGQ2ErZpYDZyuxA8PKzd2WWhjXOrxZv1wb3lmoiyFp5f2IDLocaOM-9gXSgdckA"/><span className="font-headline-sm text-headline-sm text-on-surface">TerraVerify Enterprise</span></div><p className="font-body-md text-body-md text-on-surface-variant max-w-sm">Deterministic cadastral intelligence, title chain reconciliation, and metes-and-bounds deed extraction for institutional underwriters and sovereign land offices.</p><div className="flex items-center gap-2 pt-2"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>Active Ledger Enclave</span><span className="font-mono-data text-body-sm text-on-surface-variant">v4.18-cadastral</span></div></div><div className="flex flex-col gap-3"><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Platform</span><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="cadastral-ai" href="/">Cadastral AI Engine</a><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="verification-ledger" href="/">Title Chain Auditor</a><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="platform" href="/">GIS Parcel Boundary Overlay</a><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="platform" href="/">Metes-and-Bounds Parser</a><Link className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" href="/login" >Underwriting Console</Link></div><div className="flex flex-col gap-3"><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Security &amp; Compliance</span><div className="flex items-center gap-2 text-on-surface font-label-md text-label-md"><span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>ISO-27001 Certified</div><div className="flex items-center gap-2 text-on-surface font-label-md text-label-md"><span className="material-symbols-outlined text-[18px] text-secondary">shield</span>SOC-2 Type II Attested</div><div className="flex items-center gap-2 text-on-surface font-label-md text-label-md"><span className="material-symbols-outlined text-[18px] text-secondary">key</span>Dedicated HSM Enclave</div><div className="flex items-center gap-2 text-on-surface font-label-md text-label-md"><span className="material-symbols-outlined text-[18px] text-secondary">account_balance</span>FedRAMP In-Process</div><a className="font-body-sm text-body-sm text-secondary hover:underline pt-1" data-path="enterprise-security" href="/">Download Security Whitepaper →</a></div><div className="flex flex-col gap-3"><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Developers &amp; Legal</span><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="documentation" href="/">Cadastral API v2</a><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="documentation" href="/">SDK Reference (Python/Rust)</a><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="enterprise-security" href="/">Underwriter Guarantee SLA</a><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="privacy-notice" href="/">Privacy Policy</a><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="terms-of-service" href="/">Master Services Agreement</a></div></div><div className="pt-8 border-t border-surface-container-highest/60 flex flex-col md:flex-row items-center justify-between gap-4"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 TerraVerify Technologies Inc. All rights reserved. Sovereign Cadastral Intelligence Systems.</p><div className="flex items-center gap-6 font-mono-data text-body-sm text-on-surface-variant"><span>US Patent Pending #18/492,109</span><span>Deterministic Cryptographic Notarization</span></div></div></div></footer>
    </div>
  );
}
