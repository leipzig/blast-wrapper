blast-wrapper
=============
blast-wrapper is a node.js web-service wrapper for old NCBI BLAST executables (not BLAST+), specifically bl2seq.

In theory this should be faster than a CGI wrapper.

I use this for aligning sequences to the mitochondrial genome using bl2seq but it could be modified to use blastall with a few tweaks.

A mitochondrial BLAST index and a sample config file are provided.

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

### Result:
```
Query= mysequence
         (42 letters)



>gi|251831106|ref|NC_012920.1| Homo sapiens mitochondrion, complete
            genome
          Length = 16569

 Score = 71.3 bits (38), Expect = 2e-16
 Identities = 40/41 (97%)
 Strand = Plus / Plus

                                                     
Query: 1    tggtcaacctcgacctaggcctcctatttattctagccacc 41
            ||||||||||| |||||||||||||||||||||||||||||
Sbjct: 3590 tggtcaacctcaacctaggcctcctatttattctagccacc 3630


Lambda     K      H
    1.33    0.621     1.12 

Gapped
Lambda     K      H
    1.28    0.460    0.850 


Matrix: blastn matrix:1 -2
Gap Penalties: Existence: 0, Extension:  2.5
Number of Sequences: 1
Number of Hits to DB: 6
Number of extensions: 1
Number of successful extensions: 1
Number of sequences better than  1.0: 1
Number of HSP's gapped: 1
Number of HSP's successfully gapped: 1
Length of query: 42
Length of database: 16,569
Length adjustment: 12
Effective length of query: 30
Effective length of database: 16,557
Effective search space:   496710
Effective search space used:   496710
X1: 11 (21.1 bits)
X2: 27 (49.9 bits)
X3: 54 (99.7 bits)
S1: 10 (19.9 bits)
S2: 10 (19.6 bits)
```