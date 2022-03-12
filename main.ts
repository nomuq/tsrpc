import { InterfaceDeclaration } from "@ts-morph/common/lib/typescript";
import { Project } from "ts-morph";

const project = new Project();
project.addSourceFilesAtPaths(
  "/Users/satish/Desktop/satishbabariya/tsrpc/proto.ts"
);

// console.log(
//   project
//     .getSourceFiles()
//     .map((file) => file.getInterfaces())
//     .map((interfaces) =>
//       interfaces.map((interfaceNode) => interfaceNode.getName())
//     )
// );

export interface Service {}

const interfaces = project.getSourceFiles()[0].getInterfaces();

interfaces.forEach((interfaceNode) => {
  const extendsExpressions = interfaceNode.getExtends();

  // check if the interface extends Service
  if (extendsExpressions.length > 0) {
    const extendsExpression = extendsExpressions[0];
    const extendsExpressionText = extendsExpression.getText();
    if (extendsExpressionText === "Service") {
      // get all the methods from the service
      const methods = interfaceNode.getMethods();
      // for each method
      console.log(
        methods.map((method) => {
          return {
            method: method.getName(),
            params: method.getParameters().map((param) => param.getText()),
            returnType: method.getReturnType().getText(),
          };
        })
      );
    }
  }
});
