blast-wrapper
=============
[![Build Status](https://travis-ci.org/leipzig/blast-wrapper.svg?branch=master)](https://travis-ci.org/leipzig/blast-wrapper)

blast-wrapper is a node.js web-service wrapper for fetching pairwise BLAST or BLAST+ alignments against a fixed reference.

In theory this should be faster than a CGI wrapper.

I use this for aligning sequences to the mitochondrial genome.

A mitochondrial BLAST index and sample config files are provided.

Usage
-----

### From github:
```
git clone git@github.com:leipzig/blast-wrapper.git
cd blast-wrapper
npm start
```

### From npm:
```
npm install blast-wrapper
npm blast-wrapper start
```

### To access:
`http://localhost:8080/?name=mysequence&seq=TGGTCAACCTCGACCTAGGCCTCCTATTTATTCTAGCCACCG`

The service also accepts POST queries.

### Result:
```
BLASTN 2.2.28+


Query= mysequence

Length=42

Subject= gi|251831106|ref|NC_012920.1| Homo sapiens mitochondrion, complete
genome

Length=16569


 Score = 70.4 bits (35),  Expect = 4e-16
 Identities = 40/41 (98%), Gaps = 0/41 (0%)
 Strand=Plus/Plus

Query  1     TGGTCAACCTCGACCTAGGCCTCCTATTTATTCTAGCCACC  41
             ||||||||||| |||||||||||||||||||||||||||||
Sbjct  3590  TGGTCAACCTCAACCTAGGCCTCCTATTTATTCTAGCCACC  3630



Lambda      K        H
    1.39    0.747     1.38 

Gapped
Lambda      K        H
    1.39    0.747     1.38 

Effective search space used: 546480




Matrix: blastn matrix 1 -5
Gap Penalties: Existence: 5, Extension: 3
```

If you're looking dictionary BLAST support, checkout the bionode package https://github.com/bionode/bionode-blast
