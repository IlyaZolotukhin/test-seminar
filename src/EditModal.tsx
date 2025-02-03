import React, { useState } from 'react';
import './Modal.css';

interface Seminar {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
}

interface EditModalProps {
    seminar: Seminar;
    onSave: (seminar: Seminar) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ seminar, onSave, onClose }) => {
    const [formData, setFormData] = useState<Seminar>(seminar);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Редактирование семинара</h2>
                <form onSubmit={handleSubmit}>
                    <label>Название:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    <label>Описание:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                    <label>Дата:</label>
                    <input type="text" name="date" value={formData.date} onChange={handleChange} />
                    <label>Время:</label>
                    <input type="text" name="time" value={formData.time} onChange={handleChange} />
                    <label>Фото (URL):</label>
                    <input type="text" name="photo" value={formData.photo} onChange={handleChange} />
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Закрыть</button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
