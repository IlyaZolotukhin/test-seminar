import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditModal from "./EditModal.tsx";

interface Seminar {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
}

const SeminarList: React.FC = () => {
   // хранение загруженных семинаров
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    //состояние лоадинга
    const [loading, setLoading] = useState<boolean>(true);
    //состояния редактирования семинара
    const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
//обновление карточек
    const handleSave = async (updatedSeminar: Seminar) => {
        try {
            await axios.put(`http://localhost:3001/seminars/${updatedSeminar.id}`, updatedSeminar);
            setSeminars(seminars.map(seminar => seminar.id === updatedSeminar.id ? updatedSeminar : seminar));
            setEditingSeminar(null);
        } catch (error) {
            console.error("Ошибка при обновлении семинара:", error);
        }
    };
//загрузка данных
    useEffect(() => {
        const fetchSeminars = async () => {
            try {
                const response = await axios.get<Seminar[]>('http://localhost:3001/seminars');
                setSeminars(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSeminars();
    }, []);

    // Удаление семинара
    const handleDelete = async (id: number) => {
        //откроем окно подтверждения
        if (window.confirm("Вы уверены, что хотите удалить этот семинар?")) {
            //если "ok" то delete
            try {
                await axios.delete(`http://localhost:3001/seminars/${id}`);
                setSeminars(seminars.filter(seminar => seminar.id !== id));
            } catch (error) {
                console.error("Ошибка при удалении семинара:", error);
            }
        }
    };

    const handleEdit = (seminar: Seminar) => {
        //а здесь откроем модалку
        setEditingSeminar(seminar)
        console.log("Редактирование семинара:", seminar);
    };
//наш отрисованный лоадинг
    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="seminar-list">
            {editingSeminar && (
                <EditModal
                    seminar={editingSeminar}
                    onSave={handleSave}
                    onClose={() => setEditingSeminar(null)}
                />
            )}
            <h1>Семинары Kosmoteros</h1>
            <div className="seminars-container">
                {seminars.map(seminar => (
                    <div key={seminar.id} className="seminar-card">
                        <img src={seminar.photo} alt={seminar.title} />
                        <h2>{seminar.title}</h2>
                        <p>{seminar.description}</p>
                        <p><strong>Дата:</strong> {seminar.date}</p>
                        <p><strong>Время:</strong> {seminar.time}</p>
                        <button onClick={() => handleDelete(seminar.id)}>Удалить</button>
                        <button onClick={() => handleEdit(seminar)}>Редактировать</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeminarList;
