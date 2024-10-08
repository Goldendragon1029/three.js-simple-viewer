import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
    const radioButtons_shape = document.querySelectorAll('input[name="shape"]');
    const radioButtons_color = document.querySelectorAll('input[name="color"]');
    const radioButtons_material = document.querySelectorAll('input[name="material"]');
    radioButtons_shape.forEach((radio) => {
        radio.addEventListener('click', () => {
            const selectedValue = radio.value;
            scene.children.forEach(children => {
                if (children.geometry !== undefined && children.geometry.type !== 'BufferGeometry') {
                    if (children.geometry?.type !== selectedValue) {
                        children.visible = false;
                    } else {
                        children.visible = true;
                    }   
                }
            });
        });
    });
    radioButtons_color.forEach((radio) => {
        radio.addEventListener('click', () => {
            const selectedValue = radio.value;
            scene.children.forEach(children => {
                if (children.geometry !== undefined && children.geometry.type !== 'BufferGeometry') {
                    if (selectedValue === 'red') {
                        children.material.color.r = 1;
                        children.material.color.g = 0.3;
                        children.material.color.b = 0.3;
                    }
                    if (selectedValue === 'blue') {
                        children.material.color.r = 0.3;
                        children.material.color.g = 0.3;
                        children.material.color.b = 1;
                    }
                    if (selectedValue === 'yellow') {
                        children.material.color.r = 1;
                        children.material.color.g = 1;
                        children.material.color.b = 0.3;
                    }
                }
            });
        });
    });
    radioButtons_material.forEach((radio) => {
        radio.addEventListener('click', () => {
            const selectedValue = radio.value;
            scene.children.forEach(children => {
                if (children.geometry !== undefined && children.geometry.type !== 'BufferGeometry') {
                    if (selectedValue === 'stone') {
                        children.material = material_stone; 
                    }
                    if (selectedValue === 'iron') {
                        children.material = material_iron; 
                    }
                    if (selectedValue === 'wood') {
                        children.material = material_wood; 
                    }
                }
            });
        });
    });
})

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 15, 0, 0 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth - 300, window.innerHeight );

const container = document.getElementById('container');
container.appendChild( renderer.domElement );
renderer.setAnimationLoop( animate );
container.appendChild( renderer.domElement );

const helper = new THREE.GridHelper(20, 20);
helper.position.y = -3;
scene.add(helper);

const controls = new OrbitControls( camera, renderer.domElement );

const texture_wood = new THREE.TextureLoader().load('./madera.jpg');
const texture_stone = new THREE.TextureLoader().load('./stone.jpg');
const texture_iron = new THREE.TextureLoader().load('./iron.jpg');

texture_wood.colorSpace = THREE.SRGBColorSpace;
texture_stone.colorSpace = THREE.SRGBColorSpace;
texture_iron.colorSpace = THREE.SRGBColorSpace;

const material_wood = new THREE.MeshBasicMaterial({map: texture_wood});
const material_stone = new THREE.MeshBasicMaterial({map: texture_stone});
const material_iron = new THREE.MeshBasicMaterial({map: texture_iron});

const cube_geometry = new THREE.BoxGeometry( 3, 3, 3 );
const sphere_geometry = new THREE.SphereGeometry(2, 100, 40);
const cone_geometry = new THREE.ConeGeometry( 2, 4, 100 );

const cube = new THREE.Mesh( cube_geometry, material_iron );
const sphere = new THREE.Mesh( sphere_geometry, material_iron );
const cone = new THREE.Mesh( cone_geometry, material_iron );

scene.add(cube);
scene.add(sphere);
scene.add(cone);

scene.children.forEach(children => {
    if (children.geometry !== undefined && children.geometry.type !== 'BufferGeometry') {
        if (children.geometry?.type !== "BoxGeometry") {
            children.visible = false;
        } else {
            children.visible = true;
        }   
    }
});

controls.update();
camera.position.z = 5;

function animate() {
    renderer.render( scene, camera );
    controls.update();
}

renderer.setAnimationLoop( animate );
