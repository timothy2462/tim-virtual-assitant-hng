import { useRef, useState } from "react";
import "./App.scss";
import profile from "./hair";
import logo from "./assets/HAIRXNAME.png";
import guy from "./assets/guy.webp";
import { useLottie } from "lottie-react";
import animationData from "./assets/animation_ln7fp7v2.json";

function App() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	const { View } = useLottie(defaultOptions);
	const [restarted, setIsResetScheduled] = useState(false);
	const [popup, setPopup] = useState(false);
	const [popupMsg, setPopupMsg] = useState("Hello");
	const resetTimeoutRef = useRef<ReturnType<
		typeof setTimeout
	> | null>(null);
	//
	const [ballPosition, setBallPosition] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });

	// Reset the ball position
	const initialX = window.innerWidth - 200;
	const initialY = window.innerHeight - 200;

	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		const messageData = (e.target as HTMLElement).getAttribute(
			"data-message",
		);
		setPopupMsg(messageData || "");

		const targetX = e.pageX;
		const targetY = e.pageY;
		const clampedX = Math.max(0, Math.min(initialX, targetX));
		// const clampedY = Math.max(0, Math.min(initialY, targetY));

		setBallPosition({ x: clampedX, y: targetY });
		setIsResetScheduled(true);
		setPopup(true);

		// Clear previous timeout if exists
		if (resetTimeoutRef.current) {
			clearTimeout(resetTimeoutRef.current);
		}

		// Schedule the reset after 10 seconds (10,000 milliseconds)
		const resetTimeout = setTimeout(() => {
			setBallPosition({ x: 0, y: 0 });
			setIsResetScheduled(false);
			setPopup(false);
		}, 10000);
		resetTimeoutRef.current = resetTimeout;
	};

	const Ball = (
		<div
			className="ball"
			style={{
				transform: `translate(${
					ballPosition.x ? ballPosition.x : initialX
				}px, ${ballPosition.y ? ballPosition.y : initialY}px)`,
				position: (restarted && "absolute") || "fixed",
			}}>
			<div className="clip">{View}</div>

			{popup && (
				<div className="assistantMsg">
					<p>{popupMsg}</p>
				</div>
			)}
		</div>
	);

	const IconBTN = ({
		data = "Explain Button",
	}: {
		data?: string;
	}) => (
		<span
			data-message={data}
			className="icon"
			onClick={handleClick}>
			<Icon data={data} />
		</span>
	);
	return (
		<>
			{Ball}

			<div className="App">
				<nav className="nav">
					<div className="container navWrapper">
						<div className="logo">
							<img src={logo} />
						</div>

						<ul className="navList">
							<li>Home</li>
							<li>About</li>
							<li>Policy</li>
							<li>Contact</li>
						</ul>

						<div className="flexBTN">
							<button
								className="btn"
								data-assist="Explain Button">
								Explain Button
							</button>
							<IconBTN />
						</div>
					</div>
				</nav>
				<section className="container heroSection">
					<div className="">
						<div className="content">
							<h1 className="heroTitle">
								Mane Mode: Elevate Your Story hire our handsome male
								model and story tellers
							</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing
								elit. Eu tempor amet viverra ut semper mattis. Sed
								massa nulla mi tortor viverra. Eget non augue aliquam
								mi, commodo gravida id nullam erat. Sollicitudin sem.
							</p>
							<div className="heroBtn flexBTN">
								<button
									className="btn"
									data-assist="hh">
									Hmm....🤔
								</button>
								<IconBTN data="Hello and welcome to our website! We are delighted to have you as our guest. Our virtual assistant is here to assist you with any questions or concerns you may have. Feel free to explore our website and let us know how we can help you. Enjoy your stay!" />
							</div>
						</div>
					</div>
					<div className="">
						<img
							draggable="false"
							src={guy}
						/>
					</div>
				</section>
				<section className="cardsSection">
					<div className="container hairCards">
						{profile.map(
							(
								item: {
									image: string;
									name: string;
									data?: string;
								},
								index,
							) => (
								<div
									className="hairCard"
									key={index}>
									<img src={item.image} />
									<div className="info">
										<h3>{item.name}</h3>
										<IconBTN data={item.data} />
									</div>
								</div>
							),
						)}
					</div>
				</section>
			</div>

			<footer></footer>
		</>
	);
}

function Icon({ data }: { data: string }) {
	return (
		<svg
			data-message={data}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24">
			<mask
				data-message={data}
				id="mask0_302_86"
				style={{ maskType: "alpha" }}
				width="24"
				height="24"
				x="0"
				y="0"
				maskUnits="userSpaceOnUse">
				<path
					fill="#D9D9D9"
					d="M0 0H24V24H0z"></path>
			</mask>
			<g
				data-message={data}
				mask="url(#mask0_302_86)">
				<path
					data-message={data}
					fill="#fff"
					d="M11.95 18c.35 0 .646-.12.888-.363.241-.241.362-.537.362-.887s-.12-.646-.362-.887a1.207 1.207 0 00-.888-.363c-.35 0-.646.12-.887.363a1.207 1.207 0 00-.363.887c0 .35.12.646.363.887.241.242.537.363.887.363zm-.9-3.85h1.85c0-.55.063-.983.188-1.3.125-.317.479-.75 1.062-1.3a7.494 7.494 0 001.025-1.238c.25-.391.375-.862.375-1.412 0-.933-.342-1.65-1.025-2.15-.683-.5-1.492-.75-2.425-.75-.95 0-1.72.25-2.313.75-.591.5-1.004 1.1-1.237 1.8l1.65.65c.083-.3.27-.625.563-.975.291-.35.737-.525 1.337-.525.533 0 .933.146 1.2.437.267.292.4.613.4.963 0 .333-.1.646-.3.938-.2.291-.45.562-.75.812-.733.65-1.183 1.142-1.35 1.475-.167.333-.25.942-.25 1.825zM12 22a9.738 9.738 0 01-3.9-.788 10.099 10.099 0 01-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 012 12c0-1.383.263-2.683.788-3.9a10.099 10.099 0 012.137-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0112 2c1.383 0 2.683.263 3.9.788a10.098 10.098 0 013.175 2.137c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0122 12a9.738 9.738 0 01-.788 3.9 10.098 10.098 0 01-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0112 22zm0-2c2.233 0 4.125-.775 5.675-2.325C19.225 16.125 20 14.233 20 12c0-2.233-.775-4.125-2.325-5.675C16.125 4.775 14.233 4 12 4c-2.233 0-4.125.775-5.675 2.325C4.775 7.875 4 9.767 4 12c0 2.233.775 4.125 2.325 5.675C7.875 19.225 9.767 20 12 20z"></path>
			</g>
		</svg>
	);
}

export default App;
