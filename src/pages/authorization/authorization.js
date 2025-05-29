// пакеты для формы
import { useForm } from 'react-hook-form';
// yup для валидации полей
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// сервер
import { server } from '../../bff';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Input, H2 } from '../../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// схема для формы (через нее работает yup)
const authFormSchema = yup.object().shape({
	email: yup.string().required('Заполните логин'),
	// .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Введите email'),
	password: yup.string().required('Заполните пароль'),
	// .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?]).{8,}$/, 'Неверно заполнен пароль.')
	// .min(8, 'Неверно заполнен пароль. Пароль должен содержать минимум 8 символов'),
});

const Card = styled.div`
	background-color: #fff;
	padding: 40px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	width: 500px;
`;

const RegisterLink = styled(Link)`
	display: block;
	margin-top: 25px;
	text-align: center;
	font-size: 20px;
	color: #007bff; /* голубой */
	text-decoration: none;

	&:hover {
		text-decoration: none; /* убрать подчеркивание при наведении */
		color: #0056b3; /* чуть темнее при наведении */
	}
`;

const ErrorMessage = styled.div`
	font-size: 20px; /* Размер шрифта чуть больше обычного, но не слишком крупный */
	color: #a94442; /* Теплый темно-красный цвет */
	background-color: #f2dede; /* Светлый бледно-красный фон */
	padding: 12px 20px; /* Внутренние отступы */
	border: 1px solid #ebccd1; /* Тонкая рамка в оттенке красного */
	border-radius: 4px; /* Скругление углов чуть меньше */
	margin-bottom: 20px; /* Отступ снизу для разделения */
	margin-top: 20px; /* Отступ снизу для разделения */
	font-weight: normal; /* Нормальный вес шрифта, чтобы не было жирным */
	text-align: center; /* Центрирование текста */
`;

export const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Используем селектор для отслеживания prevWasLogout
	const prevWasLogout = useSelector((state) => state.auth?.prevWasLogout);
	// const user = useSelector((state) => state.auth?.user);

	// useEffect(() => {
	// 	if (user) {
	// 		navigate('/user');
	// 	}
	// }, [user, navigate]);
	// Когда prevWasLogout меняется на true — сбрасываем форму
	// useEffect(() => {
	// 	if (prevWasLogout) {
	// 		reset();
	// 	}
	// }, [prevWasLogout, reset]);

	const onSubmit = ({ email, password }) => {
		server.authorize(email, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(res));
			navigate('/home');
			// reset();
		});
	};

	const formError = errors.email?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<Card>
				<H2>Авторизация</H2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="email"
						placeholder="Email..."
						{...register('email', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						type="password"
						placeholder="Пароль..."
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
					{/* кнопка заблокирована , если есть ошибки формы*/}
					<Button type="submit" disabled={!!formError}>
						Войти
					</Button>
					{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
					<RegisterLink to="/register">Регистрация</RegisterLink>
					{/* условный рендеринг и вывод сообщения об ошибке */}
				</form>
			</Card>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
`;
