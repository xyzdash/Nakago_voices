/********************************************************************************

	SYNCER 〜 知識、感動をみんなと同期(Sync)するブログ

	* 配布場所
	https://syncer.jp/html5-javascript-hello-button

	* 最終更新日時
	2015/09/11 18:08

	* 作者
	あらゆ

	** 連絡先
	Twitter: https://twitter.com/arayutw
	Facebook: https://www.facebook.com/arayutw
	Google+: https://plus.google.com/114918692417332410369/
	E-mail: info@syncer.jp

	※ バグ、不具合の報告、提案、ご要望など、お待ちしております。
	※ 申し訳ありませんが、ご利用者様、個々の環境における問題はサポートしていません。

********************************************************************************/


// グローバル変数
var syncerSounds = {
	flag: {} ,
	currentTime: null ,
} ;

// 即時関数
(function()
{
	// 設定
	var setClass = 'sounds' ;							// ボタン要素のクラス名
	var setDir = 'sounds/' ;									// 音声ファイルがあるフォルダ(最後は[/])
	var setStopButtonId = 'stop-button-syncer' ;			// 停止ボタンに付けるID

	// クラス名が付いた要素を取得する
	var sounds = document.getElementsByClassName( setClass ) ;

	// 全ての要素にクリックイベントを設定する
	for( var i=0,l=sounds.length ; l>i ; i++ )
	{
		// クリックイベントの設定
		sounds[i].onclick = function()
		{
			// ファイル名の取得
			var file = this.getAttribute( 'data-file' ) ;

			// 一度生成したエレメントは生成しない
			if( typeof( syncerSounds.flag[ file ] )=="undefined" || syncerSounds.flag[ file ] != 1 )
			{
				// 生成するエレメントの調整
				var audio = document.createElement( 'audio' ) ;

				// エレメントのIDを指定
				audio.id = file ;

				// ブラウザが[.mp3]に対応している場合は[.mp3]を読み込む
				if( audio.canPlayType( 'audio/mp3' ) )
				{
					audio.src = setDir + file + '.mp3' ;
				}

				// ブラウザが[.wav]に対応している場合は[.wav]を読み込む
				else if( audio.canPlayType( 'audio/wav' ) )
				{
					audio.src = setDir + file + '.wav' ;
				}

				// [audio]を生成する
				document.body.appendChild( audio ) ;
			}

			// 初回再生以外だったら音声ファイルを巻き戻す
			stopCurrentSound() ;

			// 音声ファイルを再生[play()]する
			document.getElementById( file ).play() ;

			// 最近再生した音声としてセット
			syncerSounds.currentTime = file ;

			// 初回再生が終わった判定用に[syncerSounds.flag]の値を0から1に変更する
			// エレメントを何度も生成しないようにするため
			syncerSounds.flag[ file ] = 1 ;

			// 終了
			return false ;
		}
	}

	// 前回の音声を停止する関数
	function stopCurrentSound()
	{
		var currentSound = document.getElementById( syncerSounds.currentTime ) ;

		if( currentSound != null )
		{
			currentSound.pause() ;
			currentSound.currentTime = 0 ;
		}
	}


	// 停止ボタンをクリックした時のイベント
	document.getElementById( setStopButtonId ).onclick = function()
	{
		stopCurrentSound() ;
		return false ;
	}

})() ;
