import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, H2 } from '../../components';
import { setUser } from '../../actions';
import { useNavigate } from 'react-router-dom';

// схема для формы (через нее работает yup)
const regFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполните логин')
		.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Введите email'),
	userName: yup.string().required('Введите имя пользователя').max(10, 'Максимум 10 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?]).{8,}$/,
			'Пароль должен содержать хотя бы одну строчную букву латинского алфавита, цифру и один специльный символ',
		)
		.min(8, 'Неверно заполнен пароль. Пароль должен содержать минимум 8 символов'),
	passcheck: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const Card = styled.div`
	background-color: #fff;
	padding: 40px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	width: 500px;
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

export const RegistrationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			userName: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = ({ email, password, userName }) => {
		server.register(email, password, userName).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
			navigate('/user');
		});
	};

	const formError =
		errors?.email?.message || errors?.userName?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<Card>
				<H2>Регистрация</H2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="email"
						placeholder="Email..."
						{...register('email', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						type="text"
						placeholder="Имя пользователя..."
						{...register('userName', {
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
					<Input
						type="password"
						placeholder="Повтор пароля..."
						{...register('passcheck', {
							onChange: () => setServerError(null),
						})}
					/>
					<Button type="submit" disabled={!!formError}>
						Зарегистрироваться
					</Button>
					{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				</form>
			</Card>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background-color: #f0f0f0;
`;
