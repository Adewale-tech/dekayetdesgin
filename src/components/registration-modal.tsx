'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitRegistration, type RegistrationData } from '@/lib/firebase';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseId: string;
    courseTitle: string;
    coursePrice: number;
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function RegistrationModal({
    isOpen,
    onClose,
    courseId,
    courseTitle,
    coursePrice
}: RegistrationModalProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [emailValid, setEmailValid] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        deliveryMethod: '' as 'in-person' | 'online' | '',
        experienceLevel: '' as 'beginner' | 'intermediate' | 'professional' | '',
        careerGoals: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Email validation
        if (name === 'email') {
            if (value === '') {
                setEmailError(null);
                setEmailValid(false);
            } else if (!EMAIL_REGEX.test(value)) {
                setEmailError('Please enter a valid email address');
                setEmailValid(false);
            } else {
                setEmailError(null);
                setEmailValid(true);
            }
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate email before submission
        if (!EMAIL_REGEX.test(formData.email)) {
            setEmailError('Please enter a valid email address');
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address before submitting.",
                variant: "destructive",
            });
            return;
        }

        if (!formData.deliveryMethod || !formData.experienceLevel) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const registrationData: RegistrationData = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                deliveryMethod: formData.deliveryMethod as 'in-person' | 'online',
                experienceLevel: formData.experienceLevel as 'beginner' | 'intermediate' | 'professional',
                careerGoals: formData.careerGoals,
                courseId,
                courseTitle,
                submittedAt: new Date(),
            };

            const result = await submitRegistration(registrationData);

            if (result.success) {
                toast({
                    title: "Application Submitted!",
                    description: "Thank you for your interest! Our admissions team will contact you within 24 hours to finalize your enrollment.",
                    className: "bg-[#2C2C2C] border-[#D4AF37] text-white",
                });

                // Reset form and close modal
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    deliveryMethod: '',
                    experienceLevel: '',
                    careerGoals: '',
                });
                setEmailValid(false);
                setEmailError(null);
                onClose();
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            toast({
                title: "Submission Failed",
                description: error?.message || "There was an error submitting your application. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatPrice = (price: number) => {
        if (price === 0) return 'Program Inquiry';
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[#1a1a2e] border-[#D4AF37]/30 text-white">
                <DialogHeader className="sticky top-0 bg-[#1a1a2e] pb-4 z-10">
                    <DialogTitle className="text-2xl font-serif text-white">Apply for Admission</DialogTitle>
                    <DialogDescription className="text-gray-300">
                        <span className="font-semibold text-white">{courseTitle}</span>
                        <span className="block mt-1 text-[#D4AF37] text-lg font-bold">{formatPrice(coursePrice)}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-200">Full Name *</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                            className="bg-[#2C2C2C] border-gray-600 text-white placeholder:text-gray-400 focus:border-[#D4AF37]"
                        />
                    </div>

                    {/* Email with Validation */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-200">Email Address *</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="your.email@example.com"
                                className={`bg-[#2C2C2C] border-gray-600 text-white placeholder:text-gray-400 pr-10 ${emailError ? 'border-red-500 focus:border-red-500' :
                                    emailValid ? 'border-green-500 focus:border-green-500' : 'focus:border-[#D4AF37]'
                                    }`}
                            />
                            {/* Validation Icon */}
                            {formData.email && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {emailValid ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                            )}
                        </div>
                        {emailError && (
                            <p className="text-sm text-red-400">{emailError}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-200">Phone Number *</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="+234 800 000 0000"
                            className="bg-[#2C2C2C] border-gray-600 text-white placeholder:text-gray-400 focus:border-[#D4AF37]"
                        />
                    </div>

                    {/* Delivery Method */}
                    <div className="space-y-2">
                        <Label className="text-gray-200">Preferred Delivery Method *</Label>
                        <Select onValueChange={(value) => handleSelectChange('deliveryMethod', value)}>
                            <SelectTrigger className="bg-[#2C2C2C] border-gray-600 text-white focus:border-[#D4AF37]">
                                <SelectValue placeholder="Select delivery method" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2C2C2C] border-gray-600">
                                <SelectItem value="in-person" className="text-white hover:bg-[#D4AF37]/20">In-Person</SelectItem>
                                <SelectItem value="online" className="text-white hover:bg-[#D4AF37]/20">Online</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-2">
                        <Label className="text-gray-200">Experience Level *</Label>
                        <Select onValueChange={(value) => handleSelectChange('experienceLevel', value)}>
                            <SelectTrigger className="bg-[#2C2C2C] border-gray-600 text-white focus:border-[#D4AF37]">
                                <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2C2C2C] border-gray-600">
                                <SelectItem value="beginner" className="text-white hover:bg-[#D4AF37]/20">Beginner</SelectItem>
                                <SelectItem value="intermediate" className="text-white hover:bg-[#D4AF37]/20">Intermediate</SelectItem>
                                <SelectItem value="professional" className="text-white hover:bg-[#D4AF37]/20">Professional</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Career Goals */}
                    <div className="space-y-2">
                        <Label htmlFor="careerGoals" className="text-gray-200">Career Goals</Label>
                        <Textarea
                            id="careerGoals"
                            name="careerGoals"
                            value={formData.careerGoals}
                            onChange={handleInputChange}
                            placeholder="Tell us about your fashion design aspirations..."
                            rows={3}
                            className="bg-[#2C2C2C] border-gray-600 text-white placeholder:text-gray-400 focus:border-[#D4AF37] resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 pb-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting || !emailValid}
                            className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-white font-semibold py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
