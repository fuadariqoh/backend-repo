import jwt from "jsonwebtoken";

interface IJwtUtils {
  sign(payload: any, secret: string, options?: any): string;
  verify(token: string, secret: string): any;
}

class JwtUtils implements IJwtUtils {
  sign(payload: any, secret: string, options?: any): string {
    const token = jwt.sign(payload, secret, options);
    return token;
  }
  verify(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");
    console.log(decoded, "decoded");
    return decoded;
  }
}

const jwtUtils = new JwtUtils();

export { jwtUtils };
