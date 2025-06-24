export const loadAdobeLaunch = () => {
	const script = document.createElement("script");
	//get different script for production and development
	if (process.env.NODE_ENV === "development") {
		console.log("Loading Adobe Launch script for development");
		script.src = "https://assets.adobedtm.com/467469cdd595/f9651373cafd/launch-a46d93f0c752-development.min.js";
  	} else {
		//production script		
		console.log("Loading Adobe Launch script for production");
		script.src = "https://assets.adobedtm.com/467469cdd595/f9651373cafd/launch-9e812df82057.min.js";
	}	
  	script.async = true;
  	document.head.appendChild(script);
};