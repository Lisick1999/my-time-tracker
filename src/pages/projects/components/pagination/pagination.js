import styled from 'styled-components';
import { Button } from '../../../../components';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				{`<<`}
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				{`<`}
			</Button>
			<div className="current-page">{page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				{`>`}
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				{`>>`}
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	align-items: center;

	top: 10px;
	& button {
		margin: 0 10px;
	}

	& .current-page {
		display: block;
		width: 100%;
		height: 32px;
		margin: 0 5px;
		text-align: center;
		font-size: 21px;
		font-weight: 500;
		line-height: 26px;
	}
`;
