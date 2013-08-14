nodeblast
=========
a node.js wrapper for BLAST executables (not BLAST+) so it can be offloaded to another server

In theory this should be faster than a CGI wrapper.

I use this for aligning stuff to the mitochondrial genome using bl2seq but it could be modified to use blastall with a few tweaks.


Usage:
`node nodeblast.js`

http://myserver:8080/?name=mysequence&seq=TGGTCAACCTCGACCTAGGCCTCCTATTTATTCTAGCCACCG

