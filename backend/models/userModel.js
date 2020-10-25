import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  // 第二引数でoption指定
  timestamps: true,
})

// user modelのmethodとして作成するとreusable。bcrypt関数は基本非同期なのでasync awaitを使用、hashSync, compareSync等は同期関数
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  // isModifiedはmongooseのfieldが更新されたかどうかをcheckする関数
  // passwordの更新がない時、next
  if (!this.isModified('password')) {
    next()
  }
  // passwordの更新がある時にpasswordをhash化
  // passwordをただ暗号化するだけでなく、passwordにrandomなsaltを付けて強化し暗号化する。作成されるsaltは毎回違うので　hash化されるpasswordも違う
  const salt = await bcrypt.genSalt(10)
  // password更新
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User