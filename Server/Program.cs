using Profile.Context;
using Profile.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.StaticFiles;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
     builder => builder.WithOrigins("https://yze-bio.netlify.app", "https://yze.bio", "https://localhost:3000") // Adjust origins as needed
                           .AllowAnyMethod() // Or explicitly list PATCH
                           .AllowAnyHeader()
  );
});
// Add services to the container.


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>options.UseNpgsql(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
 

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllersWithViews();

builder.Services.AddMvc(options =>
{
   options.SuppressAsyncSuffixInActionNames = false;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseStaticFiles();// For the wwwroot folder

app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.Run();

// TO RUN: dotnet run --launch-profile https
 
//  MIGRATIONS:
// dotnet ef migrations add MigracaoInicial 
// dotnet ef database update MigracaoInicial

// Generate controllers
// dotnet aspnet-codegenerator controller -name MODELNAMEController -async -api -m MODEL -dc AppDbContext -outDir Controllers 

