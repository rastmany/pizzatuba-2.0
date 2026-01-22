import React, { useState } from 'react';

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
    eventType: 'birthday',
    eventDate: ''
};

// Google Apps Script webhook URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycfGfsJGZhSzP3zplw7WQSIHHY_fHPFQL1uQx1LI856BgFq45YLnwX-WEuaFg30SrMUQ/exec';

export function useContactForm(): UseContactFormReturn {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            // Sanitize all inputs
            const sanitizedData = {
                name: sanitizeInput(formData.name),
                phone: sanitizeInput(formData.phone),
                email: sanitizeInput(formData.email.toLowerCase()),
                budget: sanitizeInput(formData.budget),
                message: sanitizeInput(formData.message),
                eventType: sanitizeInput(formData.eventType || ''),
                eventDate: sanitizeInput(formData.eventDate || ''),
                guests: formData.guests,
                duration: formData.duration,
                pizzas: formData.pizzas,
                drinks: formData.drinks,
                hasCake: formData.hasCake,
                menuType: formData.menuType,
                estimatedCost: formData.estimatedCost,
                source: window.location.hostname
            };

            // Send to Google Apps Script
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script requires no-cors mode
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sanitizedData)
            });

            // В режиме no-cors мы не можем прочитать ответ,
            // поэтому просто считаем успешным если нет ошибки
            setIsSuccess(true);
            setFormData(initialFormData);

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
        setFormData(initialFormData);
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
