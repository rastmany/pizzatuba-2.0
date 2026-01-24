import React, { useState, useEffect } from 'react';

interface FormData {
    name: string;
    phone: string;
    email: string;
    budget: string;
    message: string;
    eventType?: string;
    eventDate?: string;
    guests?: number;
    duration?: number;
    pizzas?: number;
    drinks?: number;
    hasCake?: boolean;
    menuType?: string;
    estimatedCost?: number;
    // Anti-spam fields
    _gotcha?: string;  // Honeypot - must be empty
    _loadTime?: number; // When form was loaded
}

interface UseContactFormReturn {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    resetForm: () => void;
}

const initialFormData: FormData = {
    name: '',
    phone: '',
    email: '',
    budget: '',
    message: '',
    eventType: '',
    eventDate: '',
    _gotcha: '',
    _loadTime: Date.now()
};

// Google Apps Script webhook URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycfGfsJGZhSzP3zplw7WQSIHHY_fHPFQL1uQx1LI856BgFq45YLnwX-WEuaFg30SrMUQ/exec';

export function useContactForm(): UseContactFormReturn {
    const [formData, setFormData] = useState<FormData>({
        ...initialFormData,
        _loadTime: Date.now()
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Set load time when hook is initialized
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            _loadTime: Date.now()
        }));
    }, []);

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            setError('Palun sisesta oma nimi');
            return false;
        }
        if (!formData.phone.trim() && !formData.email.trim()) {
            setError('Palun sisesta telefon või email');
            return false;
        }
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Palun sisesta korrektne email');
            return false;
        }
        return true;
    };

    const sanitizeInput = (input: string): string => {
        if (!input) return '';
        return input
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/[<>"'&]/g, '') // Remove potentially dangerous characters
            .trim()
            .slice(0, 1000); // Limit length
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setError(null);

        // 1. Honeypot check - if filled, silently "succeed"
        if (formData._gotcha && formData._gotcha.trim() !== '') {
            console.log('Bot detected: honeypot filled');
            setIsSuccess(true);
            return;
        }

        // 2. Timing check - form must be open for at least 3 seconds
        if (formData._loadTime) {
            const timeDiff = Date.now() - formData._loadTime;
            if (timeDiff < 3000) {
                console.log('Bot detected: too fast', timeDiff);
                setIsSuccess(true);
                return;
            }
        }

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Sanitize all inputs - only include fields that have values
            const sanitizedData: Record<string, unknown> = {
                name: sanitizeInput(formData.name),
                source: window.location.hostname
            };

            // Only add optional fields if they have values
            if (formData.phone) sanitizedData.phone = sanitizeInput(formData.phone);
            if (formData.email) sanitizedData.email = sanitizeInput(formData.email.toLowerCase());
            if (formData.budget) sanitizedData.budget = sanitizeInput(formData.budget);
            if (formData.message) sanitizedData.message = sanitizeInput(formData.message);

            // Event-specific fields - only add if this is an event booking
            if (formData.eventType) sanitizedData.eventType = sanitizeInput(formData.eventType);
            if (formData.eventDate) sanitizedData.eventDate = sanitizeInput(formData.eventDate);
            if (formData.guests) sanitizedData.guests = formData.guests;
            if (formData.duration) sanitizedData.duration = formData.duration;
            if (formData.pizzas) sanitizedData.pizzas = formData.pizzas;
            if (formData.drinks) sanitizedData.drinks = formData.drinks;
            if (formData.hasCake !== undefined) sanitizedData.hasCake = formData.hasCake;
            if (formData.menuType) sanitizedData.menuType = formData.menuType;
            if (formData.estimatedCost) sanitizedData.estimatedCost = formData.estimatedCost;

            // Send directly to Google Apps Script
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sanitizedData)
            });

            // In no-cors mode we can't read response, assume success if no error
            setIsSuccess(true);
            setFormData({
                ...initialFormData,
                _loadTime: Date.now()
            });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);

        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Vabandust, midagi läks valesti. Palun proovi uuesti või helista meile.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            ...initialFormData,
            _loadTime: Date.now()
        });
        setError(null);
        setIsSuccess(false);
    };

    return {
        formData,
        setFormData,
        isSubmitting,
        isSuccess,
        error,
        handleSubmit,
        resetForm
    };
}
