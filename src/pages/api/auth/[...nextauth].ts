import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { login } from '../../../services/api'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user'
    })
  ],
  callbacks:{
    async session(session){
      try {
        const { email, name } = session.user
  
        const { challenges, currentExperience, level } = await login(name, email)

        session.user = {
          ...session.user,
          challengesCompleted: challenges,
          currentExperience,
          level
        }
  
        return session

      } catch {
        session.user = {
          ...session.user,
          challengesCompleted: 0,
          currentExperience: 0,
          level: 1
        }

        return session
      }
    },
    async signIn(user, account, profile){
      const { email, name } = user

      try {
      
        await login(name, email)     
  
        return true
      } catch (e){
        console.log(e);
              
        return false
      }

    }
  }
})