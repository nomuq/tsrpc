import { Project } from "ts-morph";

const project = new Project();
project.addSourceFilesAtPaths(
  "/Users/satish/Desktop/satishbabariya/tsrpc/proto.ts"
);

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

      const file = project.createSourceFile(
        "/Users/satish/Desktop/satishbabariya/tsrpc/generated/server.ts",
        "",
        { overwrite: true }
      );

      const unimpl = file.addInterface({
        name: `Unimplemented${interfaceNode.getName()}`,
        isExported: true,
      });

      methods.forEach((method) => {
        const returnType = method.getReturnType().getText();
        const responseType = returnType
          .replace("Promise<", "")
          .replace(">", "");

        // find the response type from interfaces
        const responseInterface = interfaces.find(
          (interfaceNode) => interfaceNode.getName() === responseType
        );

        // add the response type to the file
        if (responseInterface) {
          const responseInterfaceNode = file.addInterface({
            ...responseInterface.getStructure(),
            isExported: true,
          });
        }

        const parameters = method
          .getParameters()
          .map((param) => param.getStructure());

        parameters.forEach((param) => {
          const paramInterface = interfaces.find(
            (interfaceNode) => interfaceNode.getName() === param.type
          );

          if (paramInterface) {
            const paramInterfaceNode = file.addInterface({
              ...paramInterface.getStructure(),
              isExported: true,
            });
          }
        });

        unimpl.addMethod({
          name: method.getName(),
          parameters: parameters,
          returnType: `Promise<${responseType}>`,
        });
      });

      file.saveSync();
    }
  }
});
