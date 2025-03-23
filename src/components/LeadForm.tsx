
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowRight, Upload } from "lucide-react";
import { toast } from "sonner";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    automationNeeds: "",
    contactMethod: "email",
    budget: "",
    source: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your request has been submitted! We'll contact you soon.");
      // Reset form or redirect
    }, 1500);
  };

  return (
    <section id="lead-form" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Get Your</span>{" "}
            <span className="text-gradient text-shadow-neon">AI Agent</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto text-balance">
            Take the first step toward transforming your business with AI automation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glassmorphism rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name <span className="text-neon-purple">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address <span className="text-neon-purple">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+971 58 123 4567"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">
                  Company / Business Name
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="automationNeeds" className="text-white">
                What are you looking to automate? <span className="text-neon-purple">*</span>
              </Label>
              <Textarea
                id="automationNeeds"
                name="automationNeeds"
                value={formData.automationNeeds}
                onChange={handleChange}
                placeholder="Tell us about your business needs and what processes you'd like to automate..."
                required
                className="min-h-[120px] bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactMethod" className="text-white">
                  Preferred Contact Method
                </Label>
                <Select
                  value={formData.contactMethod}
                  onValueChange={(value) => handleSelectChange("contactMethod", value)}
                >
                  <SelectTrigger id="contactMethod" className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1D2B] border-white/10">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="call">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-white">
                  Budget Range (Optional)
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleSelectChange("budget", value)}
                >
                  <SelectTrigger id="budget" className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1D2B] border-white/10">
                    <SelectItem value="below-5k">Below $5,000</SelectItem>
                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k-plus">$25,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file" className="text-white">
                Upload File / Brief (Optional)
              </Label>
              <div className="flex items-center justify-center border border-dashed border-white/30 rounded-lg p-6 bg-white/5">
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-8 w-8 mb-2 text-white/60" />
                  <span className="text-sm text-white/60">Click to upload or drag and drop</span>
                  <span className="text-xs text-white/40 mt-1">PDF, DOC, DOCX, TXT (Max 10MB)</span>
                  <input id="file-upload" type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source" className="text-white">
                How did you hear about us?
              </Label>
              <Select
                value={formData.source}
                onValueChange={(value) => handleSelectChange("source", value)}
              >
                <SelectTrigger id="source" className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select a source" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1D2B] border-white/10">
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="search">Search Engine</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-6 bg-neon-purple hover:bg-neon-purple/90 text-white neon-glow"
            >
              Get My AI Agent
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
