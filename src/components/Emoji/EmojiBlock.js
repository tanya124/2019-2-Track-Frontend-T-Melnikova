import React from 'react';
import PropType from 'prop-types';

import styled from '@emotion/styled';

import styles from './Emoji.module.css';
import Portal from '../Portal';

const Block = styled.div`
  position: absolute;
  bottom: 50px;
  right: 5px;
  width: 400px;
  height: 160px;
  background: #f1f1f1;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
`;

function getClassName(code) {
	switch (code) {
		case 'avocado':
			return styles.avocado;
		case 'baby_bottle':
			return styles.baby_bottle;
		case 'bacon':
			return styles.bacon;
		case 'bagel':
			return styles.bagel;
		case 'baguette_bread':
			return styles.baguette_bread;
		case 'bento_box':
			return styles.bento_box;
		case 'banana':
			return styles.banana;
		case 'beer_mug':
			return styles.beer_mug;
		case 'birthday_cake':
			return styles.birthday_cake;
		case 'bone':
			return styles.bone;
		case 'bottle_with_popping_cork':
			return styles.bottle_with_popping_cork;
		case 'bowl_with_spoon':
			return styles.bowl_with_spoon;
		case 'bread':
			return styles.bread;
		case 'broccoli':
			return styles.broccoli;
		case 'burrito':
			return styles.burrito;
		case 'candy':
			return styles.candy;
		case 'canned_food':
			return styles.canned_food;
		case 'carrot':
			return styles.carrot;
		case 'cheese_wedge':
			return styles.cheese_wedge;
		case 'cherries':
			return styles.cherries;
		case 'chestnut':
			return styles.chestnut;
		case 'chocolate_bar':
			return styles.chocolate_bar;
		case 'chopsticks':
			return styles.chopsticks;
		case 'clinking_beer_mugs':
			return styles.clinking_beer_mugs;
		default:
			break;
	}
	return 'error';
}

export const parseMessge = (message) => {
	const regularExpression = /:.*?:/;
	if (!regularExpression.test(message)) {
		return message;
	}

	const result = [];
	let parsing = message;
	while (regularExpression.test(parsing)) {
		const emoji = parsing.match(regularExpression);
		const index = parsing.indexOf(emoji[0]);
		parsing = parsing.replace(regularExpression, ' ');
		const parsed = parsing.slice(0, index);
		parsing = parsing.slice(index);
		const code = emoji[0].slice(1, -1);
		result.push(
			<p>{parsed}</p>
		);
		result.push(
			<div className={getClassName(code)} />
		);
	}
	result.push(
		<p>{parsing}</p>
	);
	return result;
};


class EmojiBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cods: ['avocado', 'baby_bottle', 'bacon', 'bagel', 'baguette_bread',
				'banana', 'beer_mug', 'bento_box', 'birthday_cake', 'bone',
				'bottle_with_popping_cork', 'bowl_with_spoon', 'bread', 'broccoli',
				'burrito', 'candy', 'canned_food', 'carrot', 'cheese_wedge', 'cherries',
				'chestnut', 'chocolate_bar', 'chopsticks', 'clinking_beer_mugs']
		};
	}

	render() {
		const { attachEmoji } = this.props;
		const { cods }= this.state;
		const emojiSpite = [];
		let chunk = [];
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < cods.length; i++) {
			if ((i+1)%10 === 0) {
				emojiSpite.push(
					<Row>{ chunk }</Row>
				);
				chunk = [];
			}
			const code = cods[i];
			chunk.push(
				<div className={getClassName(code)} role="button" aria-label="emoji" tabIndex={-1}
					onClick={(e) => attachEmoji(code)}
					onKeyPress={(e) => {}}/>
			);
		}
		emojiSpite.push(
			<Row>{ chunk }</Row>
		);

		return (
			<Portal>
				<Block>
					{ emojiSpite }
				</Block>
			</Portal>
		);
	}
}


export default EmojiBlock;

EmojiBlock.propTypes = {
	attachEmoji: PropType.func.isRequired,
};