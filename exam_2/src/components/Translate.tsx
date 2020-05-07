import * as React from 'react'
import { string } from 'prop-types';
import TranslateUtils from '../lib/utils/index'
import '../App.css';

function TranslateInput(props: any) {
	return (
		<div className="transliteInput">
		<form onSubmit={props.handleSubmit} >
			<p>Выберите язык, в который хотите выполнить перевод:</p>
			<div className='langs'>
				<input type="button" value='ru' className='button' onClick={props.handleSetLang} />
				<input type="button" value="en" className='button'onClick={props.handleSetLang}/>
				<input type="button" value="es" className='button' onClick={props.handleSetLang}/>
				<input type="button" value="it" className='button' onClick={props.handleSetLang}/>
				<input type="button" value="zh" className='button' onClick={props.handleSetLang}/>
			</div>
			<p>Введите текст:</p>
			<input className="input" type='text' onChange={props.handleChange}/>
		</form>
		</div>
	);
}

function TranslateOuntput(props: any) {
	return (
		<div className="transliteOutput">
			<p>Перевод:</p>
			<div id="output" >
				{props.translateText}
			</div>
		</div>
	);
}


class Translate extends React.Component<{}, {langTo: string, textForTranstale: string, textTranslate: string}> {
	constructor(props: any){
		super(props);

		this.state = {
			langTo: '',
			textForTranstale: '',
			textTranslate: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSetLang = this.handleSetLang.bind(this);
	}

	handleChange(event: any) {
		event.preventDefault();
		this.setState({
			textForTranstale: event.target.value
		})
	  }
	
	  async handleSubmit(event: any) {
		event.preventDefault();

		  const { textForTranstale, langTo } = this.state;
		  const result = await TranslateUtils.translate(textForTranstale, langTo);
		  this.setState({
			textTranslate: result,
		  })

	  }

	  handleSetLang(event: any) {
		event.preventDefault();
		this.setState({
			langTo: event.target.value
		})
	  }

	render() {
		return(
			<div className="container">
				<TranslateInput handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleSetLang={this.handleSetLang}/>
				<TranslateOuntput translateText={this.state.textTranslate} langTo={this.state.langTo}/>
			</div>
		);
	}
}

export default Translate;