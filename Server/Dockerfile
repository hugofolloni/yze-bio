# Use a imagem oficial do SDK do .NET 8 para buildar a aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copie o arquivo .csproj e restaure dependências
COPY *.csproj ./
RUN dotnet restore

# Copie todos os arquivos da aplicação
COPY . ./

# Compile a aplicação no modo Release
RUN dotnet publish -c Release -o /out

# Use a imagem oficial do Runtime do .NET 8 para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copie os artefatos buildados para o runtime
COPY --from=build /out .

# Exponha a porta usada pela aplicação
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["dotnet", "Server.dll"]