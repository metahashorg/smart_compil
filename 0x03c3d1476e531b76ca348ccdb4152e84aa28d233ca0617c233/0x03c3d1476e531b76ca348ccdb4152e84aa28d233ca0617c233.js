class ShtrukToken {

  constructor() {
    this._name = 'SHTRUKTOKEN';
    this._symbol = 'ST';
    this._decimals = 2;
    this.balance = {};
    this.allowed = {};
    this.contractUser = msg.sender;
    this._totalTokens = 0;
    this.finalized = false;
    Object.defineProperty(this, '_owner', {
      value: msg.sender,
      writable: false,
      enumerable: true
    });
    this.balance[this._owner] = this._totalTokens;
  }

  updateAllowed() {
    Object.keys(this.balance).forEach((key) => {
      if (!this.allowed[key]) {
        this.allowed[key] = {}
      }
    })
  }

  get contractUser() {
    return this._contractUser
  }

  set contractUser(value) {
    this._contractUser = value;
    this.updateAllowed()
  }

  name() {
    return this._name
  }

  symbol() {
    return this._symbol;
  }

  decimals() {
    return this._decimals;
  }

  totalSupply() {
    return this._totalTokens
  }

  balanceOf() {
    return this.balance[this._owner];
  }

  finalizeContract() {
    if (this.contractUser !== this._owner){
      return
    }
    this.finalized = true;
  }

  transfer(_to, _value) {
    let addressSender;
    if (this.contractUser === this._owner){
      /* the message was sent by the owner. it means a bounty program */
      addressSender = this._owner;
    } else {
      /* transfer between users*/
      addressSender = this.contractUser;
    }

    /* tokens are not enough */
    if (this.balance[addressSender] < _value){
      throw new Error('not_enough_tokens')
    }

    /* overflow */
    if (!this.balance[_to]) {
      this.balance[_to] = 0;
    }

    if ((this.balance[_to] + _value) < this.balance[_to]){
      throw new Error('tokens_overflow')
    }
    this.balance[addressSender] -= _value;
    this.balance[_to] += _value;

    return true;
  }

  transferFrom( _from, _to, _value) {
    if (!this.allowed[_from][this.contractUser]) {
      throw new Error('approve_first')
    }
    let _allowance = this.allowed[_from][this.contractUser];

    /* check of allowed value */
    if (_allowance < _value){
      throw new Error('not_allowed')
    }

    /* not enough tokens */
    if (this.balance[_from] < _value){
      throw new Error('not_enough_tokens')
    }
    this.balance[_to] += _value;
    this.balance[_from] -= _value;
    this.allowed[_from][this.contractUser] = _allowance - _value;
    return true;
  }

  approve(_spender, _value) {
    if (this.contractUser === _spender) {
      throw new Error('spender_and_contract_user_are_equal')
    }
    this.allowed[this.contractUser][_spender] = _value;
    return true;
  }

  setContract(_ownerContract) {
    if (this.contractUser === this._owner){
      this._owner = _ownerContract;
    }
  }

  setOptions(tokenCreate) {
    if ((this.contractUser === this._owner) && !this.finalized){
      this._totalTokens += tokenCreate;
      this.balance[this._owner] += tokenCreate;
    } else {
      throw new Error('not_allowed_or_contract_is_finalized')
    }
  }

  burn(_value) {
    if (this.balance[this.contractUser] <= _value){
      throw new Error('not_enough_tokens')
    }

    this.balance[this.contractUser] -= _value;
    this._totalTokens -= _value;
    return true
  }

}

const contract = new ShtrukToken();
contract.setOptions(1000000);
