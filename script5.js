function addEntry() {
    var feelings = document.getElementById('feelings').value;
    var entryText = document.getElementById('entry-text').value;
    if (entryText.trim() !== '') {
        var entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        var date = new Date().toLocaleDateString();
        entryDiv.innerHTML = '<p><strong>Date: </strong>' + date + '<br><strong>Feeling: </strong>' + feelings + '<br><strong>Entry: </strong>' + entryText + '</p>';
        document.getElementById('entries').appendChild(entryDiv);
        document.getElementById('entry-text').value = '';
    }
}
