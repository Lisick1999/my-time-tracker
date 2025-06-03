import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { Button, Input, H2, Card, ErrorMessage } from '../../components';
import { setUser } from '../../actions';
import styled from 'styled-components';

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

const AuthLink = styled(Link)`
	display: block;
	margin-top: 25px;
	text-align: center;
	font-size: 20px;
	color: #007bff;
	text-decoration: none;

	&:hover {
		text-decoration: none;
		color: #0056b3;
	}
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
					<AuthLink to="/">Авторизации</AuthLink>
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
`;
