export const name = 'Cheats';
export const type = 'cheat';
export const title = 'Танки CHEATS';
export const desc = '';

import { EmptyLobby, BetterUI, BetterVisibility, Packages, Tanki } from 'mods';
window.Packages = Packages;
let STORE = null;

export function launch () {

	EmptyLobby.use();
	BetterUI.use();
	BetterVisibility.use();

	Tanki.replace( /Color.blue.withAlpha_(\w{6})\$\(\.25\)/g, 'Color.blue.withAlpha_$1$(.5)' );
	Tanki.replace( /"box-shadow","0em 0em 0em 2px rgba\(255, 102, 102\)"/, '"null","null"' );
	Tanki.replace( /"box-shadow","0em 0em 0em 2px rgb\(51, 187, 255\)"/, '"null","null"' );

	Packages.use(

		[ 'UserGroupTitleButtonComponent:', f => {

			const Color = Packages.get( 'kotlinx.css.Color:' );

			f.Companion.leadColor = new Color( '#76FF33' );
			f.Companion.readyColor = new Color( '#76FF33' );
			f.Companion.inBattleColor = new Color( '#ffe933' );
			f.Companion.offlineColor = new Color( '#ff3333' );
			f.Companion.emptyColor = new Color( '#BFD5FF' );

			const getMemberColor_0 = f.prototype.getMemberColor_0;
			const getOrNull = Packages.get( 'kotlin.collections.getOrNull' );

			f.prototype.getMemberColor_0 = function ( t, e ) {

				const result = getMemberColor_0.bind( this )( t, e );

				if ( getOrNull( t, e ) === null ) return f.Companion.emptyColor;

				return result;

			}

		}],


		[ 'AnimationOpenContainerComponent:', f => {

			f.prototype.accelerate_0 = function ( t ) {

				return 1;

			}


		}],

		[ 'FollowCameraRelativePath:1', f => {

			const math = Packages.get('alternativa.math:');
			const bz_5 = Packages.prop( math, 'bezier', 5 )
			const bz = math[ bz_5 ];
			const getPoint_2 = Packages.prop( f.prototype, 'getPoint', 2 );

			// const p0_0 = [ 545, 145 ];
			// const p1_0 = [ 1395, 930 ];
			// const p2_0 = [ 1565, 2245 ];
			// const p3_0 = [ 5e3, 5e3 ];

			const p0_0 = [ 545, 145 ];
			const p1_0 = [ 3e3, 2e3 ];
			const p2_0 = [ 1e3, 5e3 ];
			const p3_0 = [ 5e3, 5e3 ];
			const pathDistanceFactor = 1;

			f.prototype[ getPoint_2 ] = function ( t, e ) {
				e.distance = bz( t, p0_0[0], p1_0[0], p2_0[0], p3_0[0] ) * pathDistanceFactor;
				e.height = bz( t, p0_0[1], p1_0[1], p2_0[1], p3_0[1] );
			}

		}],

		[ 'BattleMapComponent:', f => {

			const setupMap_0 = f.prototype.setupMap_0;

			f.prototype.setupMap_0 = function () {

				const AL = Packages.get( 'collections.ArrayList:' );
				const add_1 = Packages.prop( AL.prototype, 'add', 1 );

				let sg = this.mapResource_0.map.staticGeometry;
				let al = sg.prop.toArray();

				sg.prop.clear();

				for ( let e of al )
					if ( ! e.libraryName.match( 'Bush' ) )
						sg.prop[ add_1 ]( e );

				return setupMap_0.bind( this )();

			}

		}],

		[ 'MineVisibilityDistanceComponent:', f => {

			f.prototype.isAlwaysVisible_0 = function () { return true; };

		}],

		[ 'RemoteUserTitleConfiguratorComponent:', f => {

			f.prototype.adjustEnemyTitleVisibility_0 = function () { this.visible_0 = true; };

		}],

		[ 'RenderStage:', f => {

			Object.defineProperty( f, 'UserTitles', {
				get: function () { return f.SpritesOnTop }
			});

		}],

		[ 'Highlighter:', f => {

			f.prototype.enableHighlight_0 = function( t ) {}
			f.prototype.disableHighlight_0 = function( t ) {}

		}],

		[ 'GameMode:', f => {

			const initComponent = f.prototype.initComponent;

			f.prototype.initComponent = function () {

				const
				g = Packages.get.bind( Packages ),
				p = Packages.prop.bind( Packages ),

				BattleEntity = g( 'BattleEntity:' ),
				gcon_0 = p( BattleEntity.prototype, 'getComponentOrNull', 0 ),
				send_1 = p( BattleEntity.prototype, 'send', 1 ),
				on_4 = p( BattleEntity.prototype, 'on', 4 ),

				getKClass = g( 'getKClass:' ),
				TankAddedOnField = g( 'TankAddedOnField:' ),

				RemoteUserTitleConfiguratorComponent = g( 'RemoteUserTitleConfiguratorComponent:' ),
				ConfigureRemoteUserTitleMessage = g( 'ConfigureRemoteUserTitleMessage:' ),

				SkinColorTransformMessage = g( 'SkinColorTransformMessage:' ),
				ColorTransform = g( 'ColorTransform:' ),

				Highlighter = g( 'Highlighter:' ),
				UserComponent = g( 'UserComponent:' ),

				skinGray = new SkinColorTransformMessage( new ColorTransform( ...[ 0, 0, 0, 1, 165, 165, 165, 1 ] ) ),
				skinBlue = new SkinColorTransformMessage( new ColorTransform( ...[ 0, 0, 0, 1, 80, 180, 255, 1 ] ) ),
				skinRed = new SkinColorTransformMessage( new ColorTransform( ...[ 0, 0, 0, 1, 255, 124, 124, 1 ] ) ),

				drgb = ( r, g, b ) => ( r << 16 ) + ( g << 8 ) + b,

				hlGray = drgb( 0, 255, 170 ),
				hlBlue = drgb( 80, 180, 255 ),
				hlRed = drgb( 255, 124, 124 ),

				bros = Array.prototype.concat(
					STORE.state.friends.accepted.toArray(),
					// STORE.state.clan.clanAcceptedMembers.toArray()
				);


				this.entity[ on_4 ]( getKClass( TankAddedOnField ), 0, !1, msg => {

					let entity = msg.tank,
						rutcc = null;				

					if ( rutcc = entity[ gcon_0 ]( RemoteUserTitleConfiguratorComponent ) ) {

						entity[ on_4 ]( getKClass( ConfigureRemoteUserTitleMessage ), 0, !0, msg => {
							
							let team = rutcc.getTeamRelation_0(),
								uc = entity[ gcon_0 ]( UserComponent );

							if ( team.name == 'ALLY' ) {
								entity[ gcon_0 ]( Highlighter ).highlight_0( hlBlue, false );
								entity[ send_1 ]( skinBlue );
							}

							if ( team.name == 'ENEMY' ) {
								entity[ gcon_0 ]( Highlighter ).highlight_0( hlRed, false );
								entity[ send_1 ]( skinRed );
							}

							for ( let bro of bros )
							if ( bro.equals( uc.userId ) ) {
								entity[ gcon_0 ]( Highlighter ).highlight_0( hlGray, false );
								entity[ send_1 ]( skinGray );
								break;
							}

						});

					} else {

						entity[ gcon_0 ]( Highlighter ).highlight_0( hlGray, false ),
						entity[ send_1 ]( skinGray );

					}

				});

				return initComponent.bind( this )();

			}

		}],

		[ 'com.alternativaplatform.redux.Store:', f => {

			const redux = Packages.get( 'com.alternativaplatform.redux:' );
			const Store = redux.Store;

			redux.Store = function ( ...args ) {

				window.STORE = STORE = this;

				return Store.bind( this )( ...args );

			}

			redux.Store.prototype = Store.prototype;
			redux.Store.$metadata$ = Store.$metadata$;

		}],

		[ 'BattleBonus:', f => {

			const initLight_0 = f.prototype.initLight_0;

			f.prototype.initLight_0 = function () {

				const res = initLight_0.bind( this )();

				this.bonusMesh.object3d.outlineColor = this.bonusData_0.bonusLight.lightColor.color;
				this.bonusMesh.object3d.outlined = true;

				return res;

			}

		}],

	);

	Tanki.launch();

}