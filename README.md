# vm_v8_compil
This repository is used to save the compilation result and execute contracts on v8-server. 

Each vm_v8_compil directory corresponds to some Metahash address created by the server. This directory contains following files:

`*.bc` - file - contract bytecode.

`*.cmpl` - file - contract code cache file.

`*.js` - files - contract code and code of its commands.

`*.dbgi` - debug output while executing the contract code.

`*.log` - log of errors occurred when processing contract code.

`*.shot` - files - memory snapshots corresponding to the virtual machine state after executing js-files.

Commit runs automatically when creating a new contract.
