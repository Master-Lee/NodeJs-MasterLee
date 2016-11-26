Node.js��child_processģ��������������spawn��exec�����������������Ա���������һ���ӽ�����ִ�������ĳ���һЩNode.js�����ֳ�����������������е������󣺼�Ȼ���������Ĺ���һ������ô����Ӧ��ѡ���ĸ��������ڱ����У����ǽ�һ����̽��spawn����exec�����Ĳ�֮ͬ�����Ա����ڽ����ܹ�ѡ����ȷ�ķ�����

child_process.spaen�᷵��һ������stdout��stderr���Ķ��������ͨ��stdout������ȡ�ӽ��̷��ظ�Node.js�����ݡ�stdoutӵ�С�data��,��end���Լ�һ���������е��¼���������Ҫ�ӽ��̷��ش������ݸ�Nodeʱ������˵ͼ������ȡ���������ݵȵȣ������ʹ��spawn������

child_process.spawn�����ǡ��첽�е��첽������˼�����ӽ��̿�ʼִ��ʱ�����Ϳ�ʼ��һ�����ܽ����ݴ��ӽ��̷��ظ�Node��

������һ�����ӣ�����˵�������һ��URL�����ļ�������ѡ��ʹ��curl���ߣ���ʱ�����ǾͿ�����Node��ʹ��spawn����curl���ߣ������Ǿ�����룺

// ʹ��curl�����ļ��ĺ���
var download_file_curl = function(file_url) {

	// ��ȡ�ļ���
	var file_name = url.parse(file_url).pathname.split('/').pop();
	// ����һ����д����ʵ��
	var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
	// ʹ��spawn����curl
	var curl = spawn('curl', [file_url]);
	// Ϊspawnʵ�������һ��data�¼�
	curl.stdout.on('data', function(data) { file.write(data); });
	// ���һ��end���������ر��ļ���
	curl.stdout.on('end', function(data) {
		file.end();
		console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
	});
	// ���ӽ����˳�ʱ������Ƿ��д���ͬʱ�ر��ļ���
	curl.on('exit', function(code) {
		if (code != 0) {
			console.log('Failed: ' + code);
		}
	});
};
child_process.exec��������ӽ����з���һ��������buffer��Ĭ������£����buffer�Ĵ�СӦ����200k������ӽ��̷��ص����ݴ�С������200k�����򽫻������ͬʱ��ʾ������Ϣ��Error��maxBuffer exceeded���������ͨ����exec�Ŀ�ѡ��������һ�������buffer��������������⣬�����㲻Ӧ������������Ϊexec�����Ͳ����������غܶ����ݵķ����������кܶ����ݷ��ص��������Ӧ��ʹ�������spawn��������ôexec������������ʲô���أ����ǿ���ʹ���������г���Ȼ�󷵻ؽ����״̬�������ǽ�������ݡ�

child_process.exec�����ǡ�ͬ���е��첽������˼�Ǿ���exec���첽�ģ���һ��Ҫ�ȵ��ӽ������н����Ժ�Ȼ��һ���Է������е�buffer���ݡ����exec��buffer������õĲ�������������һ����maxBuffer exceeded������ʧ�ܸ��ա�

������һ�����������ڻ�����Ҫ��һ��URL�����ļ�����ͬ���ǣ���������Ҫʹ��wget����������curl��������ʱ���Ǿ���Ҫʹ��exec������Node��ִ��wget���ͬʱ���ӽ���������Ϻ󷵻ؽ����Ϣ�������Ǿ�����룺

// ʹ��wget�����ļ��ĺ���
var download_file_wget = function(file_url) {

	// ��ȡ�ļ���
	var file_name = url.parse(file_url).pathname.split('/').pop();
	// ���wget����
	var wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url;
	// ʹ��execִ��wget����

	var child = exec(wget, function(err, stdout, stderr) {
		if (err) throw err;
		else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
	});
};
���ڣ���Ӧ���Ѿ������spawn��exec֮��������ˡ��ܽ�һ�£�������Ҫ���ӽ��̷��ش�������ʱʹ��spawn�����ֻ�Ƿ��ؼ򵥵�״̬��Ϣ����ôʹ��exec��

