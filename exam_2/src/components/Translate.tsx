import * as React from 'react'
import TranslateUtils from '../lib/utils/index'
import '../App.css';

function TranslateInput(props: {
	handleChange: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined, 
	handleSubmit: ((event: React.KeyboardEvent<HTMLTextAreaElement>) => void) | undefined,
	handleSetLang: ((event: React.FormEvent<HTMLInputElement>) => void) | undefined
}) {
	return (
		<div className="transliteInput">
		<form >
			<p className="headerBlock">Выберите язык, в который хотите выполнить перевод:</p>
			<div className='langs'>
				<input type="button" value='ru' className='button' onClick={props.handleSetLang} />
				<input type="button" value="en" className='button'onClick={props.handleSetLang}/>
				<input type="button" value="es" className='button' onClick={props.handleSetLang}/>
				<input type="button" value="it" className='button' onClick={props.handleSetLang}/>
				<input type="button" value="zh" className='button' onClick={props.handleSetLang}/>
			</div>
			<textarea className="input" onChange={props.handleChange} onKeyPress={props.handleSubmit}/>
		</form>
		</div>
	);
}

function TranslateOuntput(props: {translateText: string, langTo: string}) {
	return (
		<div className="transliteOutput">
			<p className="headerBlock">Перевод:</p>
			<div id="output" >
				{props.translateText}
			</div>
		</div>
	);
}


class Translate extends React.Component<{}, {langTo: string, textForTranstale: string, textTranslate: string}> {
	constructor(props: {}){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSetLang = this.handleSetLang.bind(this);
	}

	state = {
		langTo: '',
		textForTranstale: '',
		textTranslate: ''
	}

	handleChange(event: React.FormEvent<HTMLTextAreaElement>) {
		event.preventDefault();
		this.setState({
			textForTranstale: event.currentTarget.value
		})
	  }
	
	  async handleSubmit(event: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();

			  const { textForTranstale, langTo } = this.state;
			  const result = await TranslateUtils.translate(textForTranstale, langTo);
			  this.setState({
				textTranslate: result,
			  })

	  	}
	}

	  handleSetLang(event: React.FormEvent<HTMLInputElement>) {
		event.preventDefault();
		this.setState({
			langTo: event.currentTarget.value
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