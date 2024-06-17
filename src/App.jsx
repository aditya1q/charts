import './App.css';
import { TVChartContainer } from './components/TVChartContainer/index';
import { version } from './charting_library';
import {TradingViewChart} from './components/TradingViewChart';
// import TradingViewChart from './components/TradingViewChart';

const App = () => {
	return (
		<div className={'App'}>
			<header className={'App-header'}>
				<h1 className={'App-title'}>
					TradingView Charting Library and React Integration Example {version()}
				</h1>
			</header>
			<TradingViewChart symbol="IBM" interval="5"/>
		</div>
	);
}

export default App;
