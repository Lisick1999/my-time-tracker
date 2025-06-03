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

const authFormSchema = yup.object().shape({
	email: yup.string().required('Заполните логин'),
	password: yup.string().required('Заполните пароль'),
});

const RegisterLink = styled(Link)`
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

export const AuthorizationContainer = ({ className }) => {
	const {
		register,
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

	const onSubmit = ({ email, password }) => {
		server.authorize(email, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(res));

			sessionStorage.setItem('userData', JSON.stringify(res));

			navigate('/home');
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
					<Button type="submit" disabled={!!formError}>
						Войти
					</Button>
					{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
					<RegisterLink to="/register">Регистрация</RegisterLink>
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
