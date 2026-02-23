import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useCreateMessage } from "@/hooks/use-messages";
import { FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";

export function Contact() {
  const { mutate: sendMessage, isPending } = useCreateMessage();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <section id="contact" className="py-24 bg-card/30 border-t border-border/30 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display mb-4"
          >
            Get In <span className="text-accent">Touch</span>
          </motion.h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to explore potential opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Your Name</label>
                <input
                  {...form.register("name")}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
                {form.formState.errors.name && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                <input
                  {...form.register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Your Message</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
                {form.formState.errors.message && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isPending}
                className="w-full px-6 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <><Loader2 size={20} className="animate-spin" /> Sending...</>
                ) : (
                  <><Send size={20} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8 lg:pl-10"
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-1">Email</h4>
                <a href="mailto:nkokomoukan@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                  nkokomoukan@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-1">WhatsApp / Phone</h4>
                <a href="https://wa.me/237654801108" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                  +237 654 801 108
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-1">Location</h4>
                <p className="text-muted-foreground">Cameroon</p>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50">
              <h4 className="text-lg font-semibold text-foreground mb-4">Connect on Socials</h4>
              <div className="flex gap-4">
                <a href="https://wa.me/237654801108" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl glass-panel text-green-500 hover:text-white hover:bg-green-600 transition-all hover:-translate-y-1">
                  <FaWhatsapp size={24} />
                </a>
                <a href="https://www.linkedin.com/in/nkoko-joel-nkoko-4bb18529a" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl glass-panel text-blue-500 hover:text-white hover:bg-blue-600 transition-all hover:-translate-y-1">
                  <FaLinkedin size={24} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100064953483370" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl glass-panel text-blue-600 hover:text-white hover:bg-blue-700 transition-all hover:-translate-y-1">
                  <FaFacebook size={24} />
                </a>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
