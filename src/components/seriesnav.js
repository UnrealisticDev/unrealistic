/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	faChevronDown,
	faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

import styles from './seriesnav.module.scss';

class SeriesNav extends React.Component {
	constructor() {
		super();
		this.state = { showMenu: false };

		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu(event) {
		event.preventDefault();

		this.setState({
			showMenu: !this.state.showMenu,
		});
	}

	render() {
		var { series, seriesNeighbors } = this.props;

		return (
			<>
				{series && (
					<>
						<div class='level' onClick={this.toggleMenu}>
							<div class='level-left'>
								<p className='menu-label'>{series}</p>
							</div>
							<div className='level-right'>
								<FontAwesomeIcon
									icon={this.state.showMenu ? faChevronUp : faChevronDown}
								/>
							</div>
						</div>
						{this.state.showMenu ? (
							<ul className='menu-list'>
								{seriesNeighbors.map((neighbor) => (
									<li>
										<a href={'./' + neighbor.slug}>{neighbor.title}</a>
									</li>
								))}
							</ul>
						) : null}
					</>
				)}
			</>
		);
	}
}

export default SeriesNav;
