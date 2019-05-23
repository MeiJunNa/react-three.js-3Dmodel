import './ThreeMap.css';
import React, { Component } from 'react';
import * as THREE from 'three';
import OBJLoader from './OBJLoader.js';

const style={
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '2%',
    border:'2px solid #d7dbde',
    width: '50%',
    height: '244px',
    marginLeft: '20px',
    marginTop: '20px'
}
class ThreeMap extends Component{
 	componentDidMount(){
		this.initThree();
	}
	initThree(){
		let camera, scene, renderer;
		let canvas1 = document.getElementById('canvas1');
        let width = canvas1.clientWidth;
        let height = canvas1.clientHeight;
		init();
		animate();
		function init() {
            //自定义画布位置
            renderer = new THREE.WebGLRenderer({ canvas: canvas1 });
            renderer.setSize(width, height);
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 40, width / height, 1, 1000 );
            camera.position.set(50, 50, 100);
            camera.up.x = 0;//相机以哪个方向为上方
            camera.up.y = 1;
            camera.up.z = 0;
            camera.lookAt(0, 0, 0)//相机看向哪个坐标,(0,0,0)是原点
            //这里可以修改背景颜色
            renderer.setClearColor(0xffffff);
            //这里实现是否可以控制object的位置、旋转
            // var controls = new THREE.OrbitControls(camera, renderer.domElement);
            //是否可以缩放
            // controls.enableZoom = false;
            //禁止鼠标交互,此处设置为false之后，不能移动位置，不能旋转物体
            // controls.enableRotate = false;
            var light = new THREE.DirectionalLight(0xf8d366, 0.5);
            light.position.setScalar(100);
            scene.add(light);
            scene.add(new THREE.AmbientLight(0xf8d366, 0.5));
            //加载OBJ格式的模型
            var objLoader = new OBJLoader();
            objLoader.load('https://cywarr.github.io/small-shop/Kirche3D.obj', function (object) {
                //辅助工具,x,y,z三维坐标轴
                scene.add(new THREE.AxesHelper(40));
                //模型放大1.5倍
                object.scale.set(1.5, 1.5, 1.5);
                object.position.set(0, 0, 0);
                //PI属性就是π,还表示了弧度π = 180°,Math.PI = 3.14 = 180°
                object.rotateX(-Math.PI * 0.5);
                object.rotateY(-Math.PI * 0);
                object.rotateZ(-Math.PI * 0);
                scene.add(object);
            },function(xhr){
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            });
		}
		function animate() {
			requestAnimationFrame( animate );
            render();
		}
		function render() {
            renderer.render(scene, camera);
        }
	}
	render(){
		return(
			<canvas id='canvas1' style={style}></canvas>
		)
	}
}

export default ThreeMap;
