const sdkKey = 'ffygsug5h373zpnbzuwb51ynd';

window.addEventListener('DOMContentLoaded', () => {
    
    const iframe = document.getElementById('showcase');
    const marker = document.getElementById('marker');
    const mapContainer = document.getElementById('minimap-container');
    const toggleBtn = document.getElementById('toggle-map-btn');

    const scaleX = 2.62; 
    const offsetX = 280.40; 
    const scaleY = 14.18; 
    const offsetY = 945.50;

    window.MP_SDK.connect(iframe, sdkKey, '3.10')
        .then((sdk) => {
            console.log('Connected to Hills Grammar 3D Space System');

            sdk.Camera.pose.subscribe((pose) => {
                const x3D = pose.position.x;
                const z3D = pose.position.z; 

                const rawMapX = (x3D * scaleX) + offsetX;
                const rawMapY = (z3D * scaleY) + offsetY;

                const originalImageWidth = 1920; 
                
                let currentDisplayWidth = mapContainer.clientWidth;
                if (currentDisplayWidth === 0) {
                    currentDisplayWidth = 300;
                }
                currentDisplayWidth = currentDisplayWidth - 10;
                
                const scalingRatio = currentDisplayWidth / originalImageWidth;

                const mapX = rawMapX * scalingRatio;
                const mapY = rawMapY * scalingRatio;

                console.log("3D Coordinates X:", x3D.toFixed(2), "Z:", z3D.toFixed(2));
                console.log("Screen Pixels X:", mapX.toFixed(2), "Y:", mapY.toFixed(2));

                marker.style.left = mapX + 'px';
                marker.style.top = mapY + 'px';
            });
        })
        .catch((error) => console.error('SDK Initialization Pipeline Failed:', error));

    toggleBtn.addEventListener('click', () => {
        mapContainer.classList.toggle('minimized');
        
        if (mapContainer.classList.contains('minimized')) {
            toggleBtn.innerText = 'Show Map';
        } else {
            toggleBtn.innerText = 'Hide Map';
        }
    });
});