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

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Sanitize all inputs - only include fields that have values
            const sanitizedData: Record<string, unknown> = {
                name: sanitizeInput(formData.name),
                source: window.location.hostname,
                // Anti-spam fields
                _gotcha: formData._gotcha || '',
                _loadTime: formData._loadTime
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

            // Send to our API endpoint (which proxies to Google Apps Script)
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sanitizedData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Midagi läks valesti');
            }

            setIsSuccess(true);
            setFormData({
                ...initialFormData,
                _loadTime: Date.now()
            });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);

        } catch (err) {
            console.error('Error submitting form:', err);
            const errorMessage = err instanceof Error ? err.message : 'Vabandust, midagi läks valesti. Palun proovi uuesti või helista meile.';
            setError(errorMessage);
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
