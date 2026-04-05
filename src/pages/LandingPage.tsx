import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TreePine, BarChart3, Users, FileText, BookOpen, Star, CheckCircle, ArrowRight, Leaf, Building, Globe, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroDashboard from "@/assets/hero-dashboard.png";
import attendeeEngagementImg from "@/assets/attendee-engagement.png";
import eventImpactImg from "@/assets/event-impact-analysis.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <TreePine className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">ZEERO Events</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#get-started" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Get Started</a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/login")} className="text-foreground">
                Log In
              </Button>
              <Button onClick={() => navigate("/onboarding")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                Sustainable Event Management
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
                The Sustainability Tool for{" "}
                <span className="text-primary">Event Professionals</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-4 max-w-lg">
                Empowering credible, measurable climate action across meetings, conferences & events.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  ISO 20121 Aligned
                </span>
                <span className="flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  ISO 14064 Methodologies
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={() => navigate("/onboarding")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  See How It Works
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src={heroDashboard} alt="Zeero Events dashboard showing carbon emissions tracking" className="rounded-2xl shadow-xl border border-border w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              A Trusted Carbon Management Tool for the Global MICE Industry
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ZEERO Events is a purpose-built sustainability platform for meetings, incentives, conferences and events. 
              It combines a robust emissions calculator with practical planning guidance to help event professionals 
              measure, reduce and report environmental impacts with confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Hotels & Venues</h3>
              <p className="text-sm text-muted-foreground">Structured approach to understanding event-related emissions across operations.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">M&E Agencies</h3>
              <p className="text-sm text-muted-foreground">Integrate sustainability into every stage of event planning and reporting.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Corporate Event Teams</h3>
              <p className="text-sm text-muted-foreground">From early decision-making through to post-event reporting and engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Everything You Need</h2>
          <p className="text-muted-foreground">A sustainability platform built for tomorrow's events</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: BookOpen, title: "Step by Step Guides", desc: "Structured workflows to measure and manage your event's carbon footprint." },
            { icon: Star, title: "Best Practices", desc: "Industry-leading methodologies and reduction strategies." },
            { icon: FileText, title: "White-Label Reports", desc: "Branded carbon reports for your clients and stakeholders." },
          ].map((feature) => (
            <Card key={feature.title} className="border-border hover:shadow-card-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Pricing & Plans</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible plans for hotels, venues, agencies and corporate event teams — whether you're piloting sustainability or scaling across a global programme.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cvent Lite */}
            <Card className="border-border flex flex-col">
              <CardHeader className="pb-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Cvent Lite</p>
                <CardTitle className="text-foreground text-lg">A simple CO₂e summary displayed directly inside Cvent powered by Zeero's API.</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Ideal for:</p>
                  <p className="text-sm text-muted-foreground">M&E agencies & planners who want basic visibility inside their existing workflow.</p>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Highlights:</p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />CO₂ summary inside Cvent</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Automated API calculation</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Seamless integration</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Ideal starting point before upgrading</li>
                </ul>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3"><span className="font-semibold">Upgrade to Tiers 1–3 for:</span> Dashboards, reporting, analytics, climate contributions, and full sustainability intelligence.</p>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/onboarding")}>Learn More</Button>
                </div>
              </CardContent>
            </Card>

            {/* Core */}
            <Card className="border-primary border-2 relative flex flex-col">
              <CardHeader className="pb-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Core</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">£69</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <p className="text-xs text-primary font-medium">Includes 26 Trees</p>
                <CardTitle className="text-foreground text-base mt-2">More than software, every subscription restores nature & powers renewable energy every month.</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Ideal for:</p>
                  <p className="text-sm text-muted-foreground">Hotels, venues & event teams needing simple, credible carbon reporting with built-in climate impact.</p>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">What you get:</p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />5 carbon reports per month</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />F&B, travel & venue inputs</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Unlimited users</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />White-labelled reports</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />12-month data retention</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Monthly climate contributions (trees + UN CERs)</li>
                </ul>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3"><span className="font-semibold">Why choose Core:</span> A simple, accessible way to measure event emissions while directly funding climate action.</p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/onboarding")}>Learn More</Button>
                </div>
              </CardContent>
            </Card>

            {/* Impact */}
            <Card className="border-border flex flex-col">
              <CardHeader className="pb-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Impact</p>
                <div className="inline-block bg-secondary text-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit">Coming Soon</div>
                <CardTitle className="text-foreground text-base mt-2">Advanced insights for teams scaling their sustainability performance.</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Ideal for:</p>
                  <p className="text-sm text-muted-foreground">Agencies, venues & event teams managing multiple events who need deeper insights.</p>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">What you get:</p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Everything in Core +</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />20 carbon reports per month</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Increased report allowance</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Enhanced analytics</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Advanced F&B and logistics</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Multi-event insights</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Extended data retention</li>
                </ul>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground"><span className="font-semibold">Why upgrade:</span> Unlock richer reporting & programme-level intelligence to optimise event sustainability at scale.</p>
                </div>
              </CardContent>
            </Card>

            {/* Intelligence */}
            <Card className="border-border flex flex-col">
              <CardHeader className="pb-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Intelligence</p>
                <div className="inline-block bg-secondary text-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit">Coming Soon</div>
                <CardTitle className="text-foreground text-base mt-2">Enterprise-level sustainability intelligence for organisations leading the way.</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Ideal for:</p>
                  <p className="text-sm text-muted-foreground">Large venues, hotel groups, global agencies & corporates with complex event portfolios.</p>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">What you get:</p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Unlimited reporting</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Dedicated account support</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Custom dashboards</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />API integrations</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Benchmarking & optimisation tools</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />Long-term data retention</li>
                </ul>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground"><span className="font-semibold">Why upgrade:</span> A complete sustainability intelligence ecosystem for organisations that need deep analytics, benchmarking & custom integrations.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">How ZEERO Events Works</h2>
          <p className="text-muted-foreground">Comprehensive event impact analysis</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-muted-foreground mb-6">
              ZEERO Events evaluates all major emission sources associated with meetings and events, providing a structured question flow that helps planners understand emission drivers and identify reduction opportunities early.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Delegate travel (air, rail, road)",
                "Accommodation",
                "Venue energy use & space",
                "Catering & menu choices",
                "Materials, production & waste",
                "Promotional items",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src={eventImpactImg}
              alt="Executive summary showing projected total emissions of 142,800 kgCO2e with top emission sources breakdown"
              className="rounded-2xl w-full border border-border shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Attendee Engagement */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={attendeeEngagementImg}
                alt="Attendee engagement tools showing carbon survey, CO2 impact dashboard, and question types"
                className="rounded-2xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Attendee Engagement Tools</h2>
              <p className="text-muted-foreground mb-6">
                These tools help build awareness and encourage shared responsibility across the event community.
              </p>
              <ul className="space-y-3">
                {[
                  "Branded attendee questionnaire",
                  "QR-code access for on-site engagement",
                  "Individual carbon-footprint insights",
                  "Integration into event apps",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Communications Toolkit */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Sustainability Communications Toolkit</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready-made assets to help organisers communicate sustainability efforts clearly. All assets support transparent, consistent communication throughout the event lifecycle.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FileText, title: "Customisable Slides", desc: "For welcome addresses and presentations." },
            { icon: Users, title: "Host/Moderator Scripts", desc: "Ready-to-use sustainability talking points." },
            { icon: BarChart3, title: "Visual Summaries", desc: "Of reductions achieved at your event." },
            { icon: Globe, title: "Reporting Materials", desc: "For internal or client use with full transparency." },
          ].map((item) => (
            <Card key={item.title} className="border-border text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Climate Contributions */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Climate Contributions & Impact</h2>
              <p className="text-muted-foreground mb-6">
                ZEERO Events enables organisations to support credible climate-contribution initiatives. These contributions complement reduction efforts and provide a traceable record of climate action.
              </p>
              <ul className="space-y-3">
                {[
                  "Nature-based projects such as reforestation",
                  "Renewable-energy programmes certified through recognised international mechanisms",
                  "Transparent CO₂e reporting aligned with corporate sustainability requirements",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <TreePine className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {/* Placeholder for climate projects image */}
              <div className="bg-secondary rounded-2xl aspect-[4/3] flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <TreePine className="w-16 h-16 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Climate Projects Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section id="get-started" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Get Started</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-border">
            <CardContent className="pt-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">New Users</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Select your plan above or register your interest here, and our team will be in touch to get you started.
              </p>
              <Button onClick={() => navigate("/onboarding")} className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                Create Account
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Existing ZEERO Dashboard Users</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Contact us and we'll activate the latest ZEERO Events Dashboard on your account.
              </p>
              <Button variant="outline" onClick={() => navigate("/login")} className="w-full">
                Log In
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--sidebar-dark))] text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">ZEERO Events</span>
              </div>
              <p className="text-sm opacity-70">
                Measure, reduce & offset your carbon footprint for meetings, conferences & events.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#features" className="hover:opacity-100 transition-opacity">Features</a></li>
                <li><a href="#pricing" className="hover:opacity-100 transition-opacity">Pricing</a></li>
                <li><a href="#how-it-works" className="hover:opacity-100 transition-opacity">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Get Started</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><button onClick={() => navigate("/onboarding")} className="hover:opacity-100 transition-opacity">Create Account</button></li>
                <li><button onClick={() => navigate("/login")} className="hover:opacity-100 transition-opacity">Log In</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm opacity-50">
            © {new Date().getFullYear()} Zeero Group. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
