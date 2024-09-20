using Application.Core;
using Application.Todos;
using Microsoft.EntityFrameworkCore;
using Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Domain;

namespace API.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
                {
                    Description = Messages.API_KEY_NEEDED,
                    In = ParameterLocation.Header,
                    Name = "X-Api-Key",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "ApiKeyScheme"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "ApiKey"
                            },
                            Scheme = "ApiKeyScheme",
                            Name = "X-Api-Key",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });
            });

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    var clientBaseUrl = configuration.GetSection("ClientSettings:BaseUrl").Value;
                    if (!string.IsNullOrEmpty(clientBaseUrl))
                    {
                        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins(clientBaseUrl);
                    }
                });
            });

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            return services;
        }
    }
}